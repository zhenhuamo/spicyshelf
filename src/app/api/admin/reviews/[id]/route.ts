import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { deleteReview } from "@/lib/admin-db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { env } = await getCloudflareContext({ async: true });
    const db = (env as unknown as CloudflareEnv).SPICYBOOKS_DB;

    await deleteReview(db, parseInt(id));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
