import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside (logic part)
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // without token any allow
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signup", request.nextUrl));
  }
}

// See "Matching Paths" below
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
