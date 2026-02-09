-- ========================================
-- SpicyBooks D1 Database Schema
-- ========================================

-- Books table
CREATE TABLE IF NOT EXISTS books (
  slug              TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  author            TEXT NOT NULL,
  description       TEXT,
  cover_url         TEXT,
  spice_level       INTEGER NOT NULL,
  page_count        INTEGER,
  publish_year      INTEGER,
  isbn              TEXT UNIQUE,
  amazon_url        TEXT,
  spice_description TEXT,
  editorial_review  TEXT,
  spicy_scene_count INTEGER,
  pov_style         TEXT,
  steam_level       TEXT,
  narrator          TEXT,
  series_name       TEXT,
  series_number     INTEGER,
  series_total_books INTEGER,
  subgenres         TEXT DEFAULT '[]',
  content_warnings  TEXT DEFAULT '[]',
  similar_books     TEXT DEFAULT '[]',
  perfect_for       TEXT DEFAULT '[]',
  skip_if           TEXT DEFAULT '[]',
  moods             TEXT DEFAULT '[]',
  created_at        TEXT DEFAULT (datetime('now')),
  updated_at        TEXT DEFAULT (datetime('now'))
);

-- Tropes table
CREATE TABLE IF NOT EXISTS tropes (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  emoji       TEXT
);

-- Book-Trope junction table
CREATE TABLE IF NOT EXISTS book_tropes (
  book_slug  TEXT NOT NULL REFERENCES books(slug) ON DELETE CASCADE,
  trope_slug TEXT NOT NULL REFERENCES tropes(slug) ON DELETE CASCADE,
  PRIMARY KEY (book_slug, trope_slug)
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  book_slug    TEXT NOT NULL REFERENCES books(slug) ON DELETE CASCADE,
  username     TEXT NOT NULL,
  spice_rating INTEGER,
  text         TEXT,
  date         TEXT,
  source       TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_books_spice ON books(spice_level);
CREATE INDEX IF NOT EXISTS idx_books_publish_year ON books(publish_year);
CREATE INDEX IF NOT EXISTS idx_book_tropes_trope ON book_tropes(trope_slug);
CREATE INDEX IF NOT EXISTS idx_reviews_book ON reviews(book_slug);
