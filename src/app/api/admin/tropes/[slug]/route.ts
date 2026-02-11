import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { updateTrope, deleteTrope } from "@/lib/admin-db";
import type { TropeFormData } from "@/lib/admin-types";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = (await request.json()) as TropeFormData;

    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    await updateTrope(db, slug, data);

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

    await deleteTrope(db, slug);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
