import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("X-DNS-Prefetch-Control", "on");
  // Pass path for debugging / future geo rules
  response.headers.set("x-bb-path", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|media/).*)"],
};
