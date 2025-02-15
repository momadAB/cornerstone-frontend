import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/token";

const ALLOWED_ROUTES = [
  "/chat",
  "/chat/test",
  "/dashboard",
  "/dashboard/testdash",
  "/dashboard/testdashtwo",
  "/history",
  "/login",
  "/signup",
];

export async function middleware(req: NextRequest) {
  const user = await getUser();
  const pathname = req.nextUrl.pathname;
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next();
  }
  // Redirect to /login if the user is not authenticated
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!ALLOWED_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow access to the requested route if the user is authenticated
  return NextResponse.next();
}

// Apply middleware to all routes that should be protected
export const config = {
  matcher: [
    "/",
    "/chat/:path*",
    "/dashboard/:path*",
    "/history/:path*",
    "/login",
    "/signup",
  ],
};
