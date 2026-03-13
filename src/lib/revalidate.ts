import { revalidatePath } from "next/cache";

/**
 * Revalidate all pages that might be affected by a book change.
 * Call this after creating, updating, or deleting a book.
 */
export function revalidateBookPages(slug?: string) {
  // Home page (featured books)
  revalidatePath("/");
  // Spice overview & individual spice level pages
  revalidatePath("/spice");
  for (let i = 0; i <= 5; i++) {
    revalidatePath(`/spice/${i}`);
  }
  // Tropes pages (book counts change)
  revalidatePath("/tropes");
  // Specific book page
  if (slug) {
    revalidatePath(`/books/${slug}`);
  }
}

/**
 * Revalidate pages affected by a trope change.
 */
export function revalidateTropePages(slug?: string) {
  revalidatePath("/tropes");
  if (slug) {
    revalidatePath(`/tropes/${slug}`);
  }
}

/**
 * Revalidate pages affected by a review change.
 */
export function revalidateReviewPages(bookSlug?: string) {
  if (bookSlug) {
    revalidatePath(`/books/${bookSlug}`);
  }
}
