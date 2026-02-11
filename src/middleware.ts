import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifyAdminToken } from "@/lib/admin-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("admin_token")?.value;

  // Get ADMIN_PASSWORD from Cloudflare env
  const { env } = await getCloudflareContext({ async: true });
  const password = (env as unknown as CloudflareEnv).ADMIN_PASSWORD;

  const isValid = token && password ? await verifyAdminToken(token, password) : false;

  if (isValid) {
    return NextResponse.next();
  }

  // API requests: return 401 JSON
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Page requests: redirect to /admin login page
  const loginUrl = new URL("/admin", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    // Protect /admin/* pages, but NOT /admin itself (the login page)
    "/admin/:path+",
    // Protect /api/admin/* routes, but NOT /api/admin/auth
    "/api/admin/((?!auth).*)",
  ],
};
