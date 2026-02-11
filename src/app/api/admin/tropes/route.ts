import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getAllTropesAdmin, createTrope } from "@/lib/admin-db";
import { slugify } from "@/lib/utils";
import type { TropeFormData } from "@/lib/admin-types";

export async function GET() {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    const tropes = await getAllTropesAdmin(db);
    return NextResponse.json(tropes);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as TropeFormData;

    if (!data.slug) {
      data.slug = slugify(data.name || "");
    }

    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    await createTrope(db, data);

    return NextResponse.json({ success: true, slug: data.slug }, { status: 201 });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.message.includes("UNIQUE constraint failed") ||
        error.message.includes("PRIMARY KEY"))
    ) {
      return NextResponse.json(
        { error: "A trope with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
