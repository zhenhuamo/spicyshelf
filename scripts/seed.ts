/**
 * Seed script: reads JSON data files and generates SQL INSERT statements.
 *
 * Usage:
 *   npx tsx scripts/seed.ts > scripts/seed.sql
 *   npx wrangler d1 execute spicybooks-db --local --file=scripts/seed.sql
 *   npx wrangler d1 execute spicybooks-db --remote --file=scripts/seed.sql
 */

import { readFileSync } from "fs";
import { join } from "path";

interface BookJson {
  slug: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  spiceLevel: number;
  pageCount: number;
  publishYear: number;
  isbn: string;
  amazonUrl: string;
  tropes: string[];
  subgenres: string[];
  contentWarnings: string[];
  similarBooks: string[];
  series?: { name: string; number: number; totalBooks: number };
  spiceDescription: string;
  perfectFor: string[];
  skipIf: string[];
  moods: string[];
  narrator?: string;
  editorialReview: string;
  spicySceneCount?: number;
  povStyle: string;
  steamLevel: string;
}

interface TropeJson {
  slug: string;
  name: string;
  description: string;
  emoji: string;
}

interface ReviewJson {
  username: string;
  spiceRating: number;
  text: string;
  date: string;
  source: string;
}

function esc(s: string | undefined | null): string {
  if (s == null) return "NULL";
  return `'${s.replace(/'/g, "''")}'`;
}

function jsonStr(arr: string[]): string {
  return esc(JSON.stringify(arr));
}

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, "..");
const books: BookJson[] = JSON.parse(readFileSync(join(root, "src/data/books.json"), "utf-8"));
const tropes: TropeJson[] = JSON.parse(readFileSync(join(root, "src/data/tropes.json"), "utf-8"));
const reviews: Record<string, ReviewJson[]> = JSON.parse(readFileSync(join(root, "src/data/reviews.json"), "utf-8"));

const lines: string[] = [];

lines.push("-- Auto-generated seed data");
lines.push("-- Generated at: " + new Date().toISOString());
lines.push("");

// ---- Tropes ----
lines.push("-- Tropes");
for (const t of tropes) {
  lines.push(
    `INSERT OR REPLACE INTO tropes (slug, name, description, emoji) VALUES (${esc(t.slug)}, ${esc(t.name)}, ${esc(t.description)}, ${esc(t.emoji)});`
  );
}
lines.push("");

// ---- Books ----
lines.push("-- Books");
for (const b of books) {
  lines.push(
    `INSERT OR REPLACE INTO books (slug, title, author, description, cover_url, spice_level, page_count, publish_year, isbn, amazon_url, spice_description, editorial_review, spicy_scene_count, pov_style, steam_level, narrator, series_name, series_number, series_total_books, subgenres, content_warnings, similar_books, perfect_for, skip_if, moods) VALUES (${esc(b.slug)}, ${esc(b.title)}, ${esc(b.author)}, ${esc(b.description)}, ${esc(b.coverUrl)}, ${b.spiceLevel}, ${b.pageCount}, ${b.publishYear}, ${esc(b.isbn)}, ${esc(b.amazonUrl)}, ${esc(b.spiceDescription)}, ${esc(b.editorialReview)}, ${b.spicySceneCount ?? "NULL"}, ${esc(b.povStyle)}, ${esc(b.steamLevel)}, ${b.narrator ? esc(b.narrator) : "NULL"}, ${b.series ? esc(b.series.name) : "NULL"}, ${b.series ? b.series.number : "NULL"}, ${b.series ? b.series.totalBooks : "NULL"}, ${jsonStr(b.subgenres)}, ${jsonStr(b.contentWarnings)}, ${jsonStr(b.similarBooks)}, ${jsonStr(b.perfectFor)}, ${jsonStr(b.skipIf)}, ${jsonStr(b.moods)});`
  );
}
lines.push("");

// ---- Book-Trope relations ----
lines.push("-- Book-Trope relations");
for (const b of books) {
  for (const tropeSlug of b.tropes) {
    lines.push(
      `INSERT OR REPLACE INTO book_tropes (book_slug, trope_slug) VALUES (${esc(b.slug)}, ${esc(tropeSlug)});`
    );
  }
}
lines.push("");

// ---- Reviews ----
lines.push("-- Reviews");
for (const [bookSlug, bookReviews] of Object.entries(reviews)) {
  for (const r of bookReviews) {
    lines.push(
      `INSERT INTO reviews (book_slug, username, spice_rating, text, date, source) VALUES (${esc(bookSlug)}, ${esc(r.username)}, ${r.spiceRating}, ${esc(r.text)}, ${esc(r.date)}, ${esc(r.source)});`
    );
  }
}

console.log(lines.join("\n"));
