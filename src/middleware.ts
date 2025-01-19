import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/token";

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

  // Allow access to the requested route if the user is authenticated
  return NextResponse.next();
}

// Apply the middleware to specific routes
export const config = {
  matcher: ["/"], // Replace with your protected routes
};
