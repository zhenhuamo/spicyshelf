import type { BookFormData, BookListItem, TropeFormData, ReviewFormData, ReviewListItem } from "@/lib/admin-types";
import { buildAmazonUrl } from "@/lib/utils";

/**
 * Paginated book query with optional search by title/author.
 */
export async function getBooksPaginated(
  db: D1Database,
  page: number,
  limit: number,
  search?: string
): Promise<{ books: BookListItem[]; total: number; page: number; limit: number }> {
  const offset = (page - 1) * limit;

  let countSql = "SELECT COUNT(*) as total FROM books";
  let listSql =
    "SELECT slug, title, author, cover_url, spice_level, created_at FROM books";
  const params: unknown[] = [];

  if (search && search.trim()) {
    const like = `%${search.trim()}%`;
    const whereClause = " WHERE title LIKE ?1 OR author LIKE ?1";
    countSql += whereClause;
    listSql += whereClause;
    params.push(like);
  }

  listSql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";

  const countParams = [...params];
  params.push(limit, offset);

  const [countResult, listResult] = await db.batch([
    db.prepare(countSql).bind(...countParams),
    db.prepare(listSql).bind(...params),
  ]);

  const total = (countResult.results[0] as { total: number }).total;
  const books = listResult.results as BookListItem[];

  return { books, total, page, limit };
}

/**
 * Get a single book with full data including trope slugs, suitable for the admin edit form.
 */
export async function getBookBySlugAdmin(
  db: D1Database,
  slug: string
): Promise<(BookFormData & { created_at: string; updated_at: string }) | null> {
  const [bookResult, tropesResult] = await db.batch([
    db.prepare("SELECT * FROM books WHERE slug = ?").bind(slug),
    db
      .prepare("SELECT trope_slug FROM book_tropes WHERE book_slug = ?")
      .bind(slug),
  ]);

  const row = bookResult.results[0] as Record<string, unknown> | undefined;
  if (!row) return null;

  const tropes = (tropesResult.results as { trope_slug: string }[]).map(
    (r) => r.trope_slug
  );

  // Extract ASIN from amazon_url if present
  const amazonUrl = (row.amazon_url as string) || "";
  let asin = "";
  if (amazonUrl) {
    const match = amazonUrl.match(/\/dp\/([^?/]+)/);
    if (match) asin = match[1];
  }

  return {
    slug: row.slug as string,
    title: row.title as string,
    author: row.author as string,
    description: (row.description as string) || "",
    page_count: (row.page_count as number) ?? null,
    publish_year: (row.publish_year as number) ?? null,
    isbn: (row.isbn as string) || "",
    cover_url: (row.cover_url as string) || "",
    asin,
    spice_level: row.spice_level as number,
    spice_description: (row.spice_description as string) || "",
    spicy_scene_count: (row.spicy_scene_count as number) ?? null,
    steam_level: (row.steam_level as string) || "",
    pov_style: (row.pov_style as string) || "",
    tropes,
    subgenres: parseJsonArray(row.subgenres as string),
    content_warnings: parseJsonArray(row.content_warnings as string),
    moods: parseJsonArray(row.moods as string),
    editorial_review: (row.editorial_review as string) || "",
    perfect_for: parseJsonArray(row.perfect_for as string),
    skip_if: parseJsonArray(row.skip_if as string),
    similar_books: parseJsonArray(row.similar_books as string),
    series_name: (row.series_name as string) || "",
    series_number: (row.series_number as number) ?? null,
    series_total_books: (row.series_total_books as number) ?? null,
    narrator: (row.narrator as string) || "",
    created_at: (row.created_at as string) || "",
    updated_at: (row.updated_at as string) || "",
  };
}

function parseJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Create a new book. Inserts into books table + batch inserts book_tropes.
 * Uses db.batch() for atomic operations.
 */
export async function createBook(
  db: D1Database,
  data: BookFormData
): Promise<void> {
  const amazonUrl = buildAmazonUrl(data.asin);

  const insertBookSql = `
    INSERT INTO books (
      slug, title, author, description, cover_url, spice_level,
      page_count, publish_year, isbn, amazon_url, spice_description,
      editorial_review, spicy_scene_count, pov_style, steam_level,
      narrator, series_name, series_number, series_total_books,
      subgenres, content_warnings, similar_books, perfect_for, skip_if, moods
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?
    )
  `;

  const bookStmt = db.prepare(insertBookSql).bind(
    data.slug,
    data.title,
    data.author,
    data.description || null,
    data.cover_url || null,
    data.spice_level,
    data.page_count,
    data.publish_year,
    data.isbn || null,
    amazonUrl || null,
    data.spice_description || null,
    data.editorial_review || null,
    data.spicy_scene_count,
    data.pov_style || null,
    data.steam_level || null,
    data.narrator || null,
    data.series_name || null,
    data.series_number,
    data.series_total_books,
    JSON.stringify(data.subgenres || []),
    JSON.stringify(data.content_warnings || []),
    JSON.stringify(data.similar_books || []),
    JSON.stringify(data.perfect_for || []),
    JSON.stringify(data.skip_if || []),
    JSON.stringify(data.moods || [])
  );

  const statements: D1PreparedStatement[] = [bookStmt];

  for (const tropeSlug of data.tropes || []) {
    statements.push(
      db
        .prepare("INSERT INTO book_tropes (book_slug, trope_slug) VALUES (?, ?)")
        .bind(data.slug, tropeSlug)
    );
  }

  await db.batch(statements);
}

/**
 * Update an existing book. Updates books table + rebuilds book_tropes (delete old + insert new).
 * Uses db.batch() for atomic operations.
 */
export async function updateBook(
  db: D1Database,
  slug: string,
  data: BookFormData
): Promise<void> {
  const amazonUrl = buildAmazonUrl(data.asin);

  const updateBookSql = `
    UPDATE books SET
      title = ?, author = ?, description = ?, cover_url = ?, spice_level = ?,
      page_count = ?, publish_year = ?, isbn = ?, amazon_url = ?, spice_description = ?,
      editorial_review = ?, spicy_scene_count = ?, pov_style = ?, steam_level = ?,
      narrator = ?, series_name = ?, series_number = ?, series_total_books = ?,
      subgenres = ?, content_warnings = ?, similar_books = ?, perfect_for = ?,
      skip_if = ?, moods = ?, updated_at = datetime('now')
    WHERE slug = ?
  `;

  const bookStmt = db.prepare(updateBookSql).bind(
    data.title,
    data.author,
    data.description || null,
    data.cover_url || null,
    data.spice_level,
    data.page_count,
    data.publish_year,
    data.isbn || null,
    amazonUrl || null,
    data.spice_description || null,
    data.editorial_review || null,
    data.spicy_scene_count,
    data.pov_style || null,
    data.steam_level || null,
    data.narrator || null,
    data.series_name || null,
    data.series_number,
    data.series_total_books,
    JSON.stringify(data.subgenres || []),
    JSON.stringify(data.content_warnings || []),
    JSON.stringify(data.similar_books || []),
    JSON.stringify(data.perfect_for || []),
    JSON.stringify(data.skip_if || []),
    JSON.stringify(data.moods || []),
    slug
  );

  const deleteTropesStmt = db
    .prepare("DELETE FROM book_tropes WHERE book_slug = ?")
    .bind(slug);

  const statements: D1PreparedStatement[] = [bookStmt, deleteTropesStmt];

  for (const tropeSlug of data.tropes || []) {
    statements.push(
      db
        .prepare("INSERT INTO book_tropes (book_slug, trope_slug) VALUES (?, ?)")
        .bind(slug, tropeSlug)
    );
  }

  await db.batch(statements);
}

/**
 * Delete a book by slug. CASCADE handles book_tropes and reviews cleanup.
 */
export async function deleteBook(
  db: D1Database,
  slug: string
): Promise<void> {
  await db.prepare("DELETE FROM books WHERE slug = ?").bind(slug).run();
}


/**
 * Get all tropes, ordered by name.
 */
export async function getAllTropesAdmin(
  db: D1Database
): Promise<{ slug: string; name: string; description: string; emoji: string }[]> {
  const result = await db
    .prepare("SELECT slug, name, description, emoji FROM tropes ORDER BY name")
    .all();
  return result.results as { slug: string; name: string; description: string; emoji: string }[];
}

/**
 * Create a new trope.
 */
export async function createTrope(
  db: D1Database,
  data: TropeFormData
): Promise<void> {
  await db
    .prepare("INSERT INTO tropes (slug, name, description, emoji) VALUES (?, ?, ?, ?)")
    .bind(data.slug, data.name, data.description || null, data.emoji || null)
    .run();
}

/**
 * Update an existing trope by slug.
 */
export async function updateTrope(
  db: D1Database,
  slug: string,
  data: TropeFormData
): Promise<void> {
  await db
    .prepare("UPDATE tropes SET name = ?, description = ?, emoji = ? WHERE slug = ?")
    .bind(data.name, data.description || null, data.emoji || null, slug)
    .run();
}

/**
 * Delete a trope by slug. CASCADE handles book_tropes cleanup.
 */
export async function deleteTrope(
  db: D1Database,
  slug: string
): Promise<void> {
  await db.prepare("DELETE FROM tropes WHERE slug = ?").bind(slug).run();
}

/**
 * Get reviews list, optionally filtered by book_slug. Ordered by date DESC.
 */
export async function getReviewsAdmin(
  db: D1Database,
  bookSlug?: string
): Promise<ReviewListItem[]> {
  let sql = "SELECT id, book_slug, username, spice_rating, text, date, source FROM reviews";
  const params: unknown[] = [];

  if (bookSlug) {
    sql += " WHERE book_slug = ?";
    params.push(bookSlug);
  }

  sql += " ORDER BY date DESC";

  const result = await db.prepare(sql).bind(...params).all();
  return result.results as unknown as ReviewListItem[];
}

/**
 * Create a new review.
 */
export async function createReview(
  db: D1Database,
  data: ReviewFormData
): Promise<void> {
  await db
    .prepare(
      "INSERT INTO reviews (book_slug, username, spice_rating, text, date, source) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .bind(
      data.book_slug,
      data.username,
      data.spice_rating,
      data.text || null,
      data.date || null,
      data.source || null
    )
    .run();
}

/**
 * Delete a review by id.
 */
export async function deleteReview(
  db: D1Database,
  id: number
): Promise<void> {
  await db.prepare("DELETE FROM reviews WHERE id = ?").bind(id).run();
}
