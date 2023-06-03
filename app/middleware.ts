import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
// import type { Database } from "@/lib/database.types";

// TODO
type Database = any;

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  const hoge = await supabase.auth.getSession();
  console.log(hoge);
  return res;
}
