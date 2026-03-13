import { revalidatePath } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(request: Request) {
  const { secret, path } = (await request.json()) as { secret: string; path: string };
  const { env } = await getCloudflareContext({ async: true });
  const expectedSecret = (env as unknown as CloudflareEnv).REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return Response.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (path === "/all") {
    // Revalidate all key pages at once
    const paths = ["/", "/spice", "/tropes"];
    for (let i = 0; i <= 5; i++) paths.push(`/spice/${i}`);
    for (const p of paths) revalidatePath(p);
    return Response.json({ revalidated: true, paths });
  }

  revalidatePath(path || "/");
  return Response.json({ revalidated: true, path: path || "/" });
}
