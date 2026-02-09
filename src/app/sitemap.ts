import type { MetadataRoute } from "next";
import { getBookSlugs, getTropeSlugs, getAllSpiceLevels } from "@/lib/books";

const BASE_URL = "https://spicybooks.org";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bookSlugs = await getBookSlugs();
  const tropeSlugs = await getTropeSlugs();
  const spiceLevels = getAllSpiceLevels();

  const books = bookSlugs.map((slug) => ({
    url: `${BASE_URL}/books/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const tropes = tropeSlugs.map((slug) => ({
    url: `${BASE_URL}/tropes/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const levels = spiceLevels.map((level) => ({
    url: `${BASE_URL}/spice/${level}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/tropes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/spice`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...books,
    ...tropes,
    ...levels,
  ];
}
