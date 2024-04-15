import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];

const productEditRegex = /^\/products\/\d+\/edit$/;

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("run middleware");
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  // If the user is not logged in, redirect to the login page
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If the user is logged in, redirect to the me page
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }
  if (pathname.match(productEditRegex) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/me", "/login", "/register", "/products/:path*"],
};
