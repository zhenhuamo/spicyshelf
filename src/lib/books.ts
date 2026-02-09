// Re-export all data functions from the D1 database layer.
// This file exists for backward compatibility — all pages import from here.
export {
  getAllBooks,
  getBookBySlug,
  getBooksByTrope,
  getBooksBySpiceLevel,
  getAllTropes,
  getTropeBySlug,
  getSimilarBooks,
  getFeaturedBooks,
  getTropeWithBookCount,
  getBookSlugs,
  getTropeSlugs,
  getBookshopUrl,
  getAllSpiceLevels,
} from "./db";
