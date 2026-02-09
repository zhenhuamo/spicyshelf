import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Book, Trope, Review } from "./types";

async function getDB(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  return (env as unknown as CloudflareEnv).SPICYBOOKS_DB;
}

// ---- Row → Domain type mappers ----

interface BookRow {
  slug: string;
  title: string;
  author: string;
  description: string;
  cover_url: string;
  spice_level: number;
  page_count: number;
  publish_year: number;
  isbn: string;
  amazon_url: string;
  spice_description: string;
  editorial_review: string;
  spicy_scene_count: number | null;
  pov_style: string;
  steam_level: string;
  narrator: string | null;
  series_name: string | null;
  series_number: number | null;
  series_total_books: number | null;
  subgenres: string;
  content_warnings: string;
  similar_books: string;
  perfect_for: string;
  skip_if: string;
  moods: string;
}

function rowToBook(row: BookRow, tropes: string[], reviews: Review[]): Book {
  return {
    slug: row.slug,
    title: row.title,
    author: row.author,
    description: row.description,
    coverUrl: row.cover_url,
    spiceLevel: row.spice_level,
    pageCount: row.page_count,
    publishYear: row.publish_year,
    isbn: row.isbn,
    amazonUrl: row.amazon_url,
    tropes,
    subgenres: JSON.parse(row.subgenres),
    contentWarnings: JSON.parse(row.content_warnings),
    similarBooks: JSON.parse(row.similar_books),
    series: row.series_name
      ? { name: row.series_name, number: row.series_number!, totalBooks: row.series_total_books! }
      : undefined,
    spiceDescription: row.spice_description,
    perfectFor: JSON.parse(row.perfect_for),
    skipIf: JSON.parse(row.skip_if),
    moods: JSON.parse(row.moods),
    narrator: row.narrator ?? undefined,
    editorialReview: row.editorial_review,
    spicySceneCount: row.spicy_scene_count ?? undefined,
    povStyle: row.pov_style,
    steamLevel: row.steam_level,
    reviews,
  };
}

// ---- Helper: load tropes for a book ----
async function loadBookTropes(db: D1Database, bookSlug: string): Promise<string[]> {
  const { results } = await db
    .prepare("SELECT trope_slug FROM book_tropes WHERE book_slug = ?")
    .bind(bookSlug)
    .all<{ trope_slug: string }>();
  return results.map((r) => r.trope_slug);
}

// ---- Helper: load reviews for a book ----
async function loadBookReviews(db: D1Database, bookSlug: string): Promise<Review[]> {
  const { results } = await db
    .prepare("SELECT username, spice_rating, text, date, source FROM reviews WHERE book_slug = ? ORDER BY date DESC")
    .bind(bookSlug)
    .all<{ username: string; spice_rating: number; text: string; date: string; source: string }>();
  return results.map((r) => ({
    username: r.username,
    spiceRating: r.spice_rating,
    text: r.text,
    date: r.date,
    source: r.source,
  }));
}

// ---- Helper: hydrate a single book row ----
async function hydrateBook(db: D1Database, row: BookRow): Promise<Book> {
  const [tropes, reviews] = await Promise.all([
    loadBookTropes(db, row.slug),
    loadBookReviews(db, row.slug),
  ]);
  return rowToBook(row, tropes, reviews);
}

// ---- Helper: hydrate multiple book rows ----
async function hydrateBooks(db: D1Database, rows: BookRow[]): Promise<Book[]> {
  return Promise.all(rows.map((row) => hydrateBook(db, row)));
}

// ---- Public query functions ----

export async function getAllBooks(): Promise<Book[]> {
  const db = await getDB();
  const { results } = await db.prepare("SELECT * FROM books ORDER BY created_at DESC").all<BookRow>();
  return hydrateBooks(db, results);
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  const db = await getDB();
  const row = await db.prepare("SELECT * FROM books WHERE slug = ?").bind(slug).first<BookRow>();
  if (!row) return undefined;
  return hydrateBook(db, row);
}

export async function getBooksByTrope(tropeSlug: string): Promise<Book[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT b.* FROM books b JOIN book_tropes bt ON b.slug = bt.book_slug WHERE bt.trope_slug = ?")
    .bind(tropeSlug)
    .all<BookRow>();
  return hydrateBooks(db, results);
}

export async function getBooksBySpiceLevel(level: number): Promise<Book[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT * FROM books WHERE spice_level = ?")
    .bind(level)
    .all<BookRow>();
  return hydrateBooks(db, results);
}

export async function getAllTropes(): Promise<Trope[]> {
  const db = await getDB();
  const { results } = await db.prepare("SELECT * FROM tropes ORDER BY name").all<Trope>();
  return results;
}

export async function getTropeBySlug(slug: string): Promise<Trope | undefined> {
  const db = await getDB();
  const row = await db.prepare("SELECT * FROM tropes WHERE slug = ?").bind(slug).first<Trope>();
  return row ?? undefined;
}

export async function getSimilarBooks(slugs: string[]): Promise<Book[]> {
  if (slugs.length === 0) return [];
  const db = await getDB();
  const placeholders = slugs.map(() => "?").join(",");
  const { results } = await db
    .prepare(`SELECT * FROM books WHERE slug IN (${placeholders})`)
    .bind(...slugs)
    .all<BookRow>();
  return hydrateBooks(db, results);
}

export async function getFeaturedBooks(): Promise<Book[]> {
  const db = await getDB();
  const { results } = await db
    .prepare("SELECT * FROM books ORDER BY created_at DESC LIMIT 6")
    .all<BookRow>();
  return hydrateBooks(db, results);
}

export async function getTropeWithBookCount(): Promise<(Trope & { bookCount: number })[]> {
  const db = await getDB();
  const { results } = await db
    .prepare(
      "SELECT t.*, COUNT(bt.book_slug) as book_count FROM tropes t LEFT JOIN book_tropes bt ON t.slug = bt.trope_slug GROUP BY t.slug ORDER BY t.name"
    )
    .all<Trope & { book_count: number }>();
  return results.map((r) => ({ ...r, bookCount: r.book_count }));
}

export async function getBookSlugs(): Promise<string[]> {
  const db = await getDB();
  const { results } = await db.prepare("SELECT slug FROM books").all<{ slug: string }>();
  return results.map((r) => r.slug);
}

export async function getTropeSlugs(): Promise<string[]> {
  const db = await getDB();
  const { results } = await db.prepare("SELECT slug FROM tropes").all<{ slug: string }>();
  return results.map((r) => r.slug);
}

// Bookshop.org affiliate link
export function getBookshopUrl(isbn: string): string {
  return `https://bookshop.org/a/YOUR_BOOKSHOP_ID/${isbn}`;
}

export function getAllSpiceLevels(): number[] {
  return [0, 1, 2, 3, 4, 5];
}
