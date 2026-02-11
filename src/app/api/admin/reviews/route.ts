import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getReviewsAdmin, createReview } from "@/lib/admin-db";
import type { ReviewFormData } from "@/lib/admin-types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookSlug = searchParams.get("book_slug") || undefined;

    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    const reviews = await getReviewsAdmin(db, bookSlug);
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ReviewFormData;

    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    await createReview(db, data);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
