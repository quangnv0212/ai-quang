import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "./lib/utils";

const privatePaths = [
  "/user-management",
  "/account-management",
  "/roles-management",
  "/tenant-management",
  "/user-activation",
  "/change-password",
];
const authPaths = [
  "/login",
  "/register",
  "/reset-password",
  "/forgot-password",
  "/activate-account",
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  // If user is not logged in, redirect to login page
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/" && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If user is logged in, redirect to me page
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
    "/activate-account",
    "/user-management",
    "/account-management",
    "/roles-management",
    "/tenant-management",
    "/user-activation",
    "/change-password",
  ],
};
