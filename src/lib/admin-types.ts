export interface BookFormData {
  // Step 1: 基础信息
  slug: string;
  title: string;
  author: string;
  description: string;
  page_count: number | null;
  publish_year: number | null;
  isbn: string;
  cover_url: string;
  asin: string;

  // Step 2: Spice 信息
  spice_level: number;
  spice_description: string;
  spicy_scene_count: number | null;
  steam_level: string;
  pov_style: string;

  // Step 3: 标签和分类
  tropes: string[];
  subgenres: string[];
  content_warnings: string[];
  moods: string[];

  // Step 4: 编辑内容
  editorial_review: string;
  perfect_for: string[];
  skip_if: string[];

  // Step 5: 关联数据
  similar_books: string[];
  series_name: string;
  series_number: number | null;
  series_total_books: number | null;
  narrator: string;
}

export interface BookListItem {
  slug: string;
  title: string;
  author: string;
  cover_url: string;
  spice_level: number;
  created_at: string;
}

export interface BookListResponse {
  books: BookListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface IsbnLookupResponse {
  title: string;
  author: string;
  description: string;
  page_count: number;
  publish_year: number;
  isbn: string;
  cover_url: string;
}

export interface TropeFormData {
  slug: string;
  name: string;
  description: string;
  emoji: string;
}

export interface ReviewFormData {
  book_slug: string;
  username: string;
  spice_rating: number;
  text: string;
  date: string;
  source: string;
}

export interface ReviewListItem {
  id: number;
  book_slug: string;
  username: string;
  spice_rating: number;
  text: string;
  date: string;
  source: string;
}
