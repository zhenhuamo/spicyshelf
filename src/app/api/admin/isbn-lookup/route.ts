import { NextResponse } from "next/server";
import type { IsbnLookupResponse } from "@/lib/admin-types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isbn = url.searchParams.get("isbn");

  if (!isbn) {
    return NextResponse.json({ error: "ISBN parameter is required" }, { status: 400 });
  }

  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    const apiResponse = await fetch(apiUrl);

    if (!apiResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch from Google Books API" }, { status: 502 });
    }

    const data = (await apiResponse.json()) as {
      items?: Array<{
        volumeInfo: {
          title?: string;
          authors?: string[];
          description?: string;
          pageCount?: number;
          publishedDate?: string;
          imageLinks?: { thumbnail?: string };
        };
      }>;
    };

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: "No book found for this ISBN" }, { status: 404 });
    }

    const volumeInfo = data.items[0].volumeInfo;
    const response: IsbnLookupResponse = {
      title: volumeInfo.title || "",
      author: (volumeInfo.authors || []).join(", "),
      description: volumeInfo.description || "",
      page_count: volumeInfo.pageCount || 0,
      publish_year: volumeInfo.publishedDate
        ? parseInt(volumeInfo.publishedDate.substring(0, 4), 10) || 0
        : 0,
      isbn: isbn,
      cover_url: volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") || "",
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({ error: "Failed to fetch from Google Books API" }, { status: 502 });
  }
}
