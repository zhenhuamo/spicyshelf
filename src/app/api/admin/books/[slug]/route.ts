import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getBookBySlugAdmin, updateBook, deleteBook } from "@/lib/admin-db";
import type { BookFormData } from "@/lib/admin-types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    const book = await getBookBySlugAdmin(db, slug);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = (await request.json()) as BookFormData;

    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    await updateBook(db, slug, data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    await deleteBook(db, slug);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
