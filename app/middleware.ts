import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
// import type { Database } from "@/lib/database.types";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

// TODO
type Database = any;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/signin") ||
    req.nextUrl.pathname.startsWith("/signup")
  ) {
    return;
  }

  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });
  const auth = await supabase.auth.getSession();

  if (auth.data.session == null) {
    console.log("auth data null");

    return NextResponse.redirect("http://localhost:3000/signin");
  }

  console.log("auth set");

  return res;
}
