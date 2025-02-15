import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/token";

const ALLOWED_ROUTES = [
  "/chat",
  "/chat/:id",
  "/dashboard",
  "/dashboard/:path",
  "/history",
  "/login",
  "/signup",
];

// Utility function to check if a pathname matches a route pattern
function matchRoute(pathname: string, pattern: string): boolean {
  // Split both the pathname and pattern into segments
  const pathnameSegments = pathname.split("/").filter(Boolean);
  const patternSegments = pattern.split("/").filter(Boolean);

  // If segments length doesn't match and pattern doesn't end with "*", return false
  if (
    pathnameSegments.length !== patternSegments.length &&
    !pattern.endsWith("*")
  ) {
    return false;
  }

  // Check each segment
  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i];
    const pathnameSegment = pathnameSegments[i];

    // Handle wildcards
    if (patternSegment === "*") {
      return true;
    }

    // Handle dynamic segments (starting with :)
    if (patternSegment.startsWith(":")) {
      continue;
    }

    // Handle exact matches
    if (patternSegment !== pathnameSegment) {
      return false;
    }
  }

  return true;
}

// Utility function to check if a path is a chat subpage
function isChatSubPage(pathname: string): boolean {
  return pathname.startsWith("/chat/") && pathname !== "/chat";
}

export async function middleware(req: NextRequest) {
  const user = await getUser();
  const pathname = req.nextUrl.pathname;

  // Allow access to authentication routes and chat subpages
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    isChatSubPage(pathname)
  ) {
    return NextResponse.next();
  }

  // Redirect to /login if the user is not authenticated (except for chat subpages)
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Check if the pathname matches any allowed route pattern
  const isAllowedRoute = ALLOWED_ROUTES.some((route) =>
    matchRoute(pathname, route)
  );

  if (!isAllowedRoute) {
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
