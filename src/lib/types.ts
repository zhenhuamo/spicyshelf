export interface Review {
  username: string;
  spiceRating: number;
  text: string;
  date: string;
  source: string;
}

export interface Book {
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
  // Extended fields for richer detail page
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
  reviews: Review[];
}

export interface Trope {
  slug: string;
  name: string;
  description: string;
  emoji: string;
}

export const SPICE_LABELS: Record<number, { label: string; description: string; color: string }> = {
  0: { label: "No Spice (Clean)", description: "No romantic or intimate content", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  1: { label: "Mild (Fade to Black)", description: "Romance present but intimate scenes fade to black", color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
  2: { label: "Warm (Closed Door+)", description: "Suggestive content but not explicitly described", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" },
  3: { label: "Spicy (Moderate Scenes)", description: "Explicit intimate scenes, moderately described", color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  4: { label: "Very Spicy (Explicit)", description: "Detailed explicit intimate scenes", color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
  5: { label: "Scorching (Very Explicit)", description: "Very detailed and frequent intimate scenes", color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300" },
};
