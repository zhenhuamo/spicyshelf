import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getBooksPaginated, createBook } from "@/lib/admin-db";
import { slugify } from "@/lib/utils";
import type { BookFormData } from "@/lib/admin-types";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") || undefined;
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10) || 1);
    const limit = Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10) || 20);

    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    const result = await getBooksPaginated(db, page, limit, search);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as BookFormData;

    if (!data.slug) {
      data.slug = slugify(data.title || "");
    }

    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    await createBook(db, data);

    return NextResponse.json({ success: true, slug: data.slug }, { status: 201 });
  } catch (error: unknown) {
    // D1 throws on duplicate primary key (slug conflict)
    if (
      error instanceof Error &&
      (error.message.includes("UNIQUE constraint failed") ||
        error.message.includes("PRIMARY KEY"))
    ) {
      return NextResponse.json(
        { error: "A book with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
