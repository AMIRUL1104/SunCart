import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

/**
 * MIDDLEWARE CONFIG
 * - Intercepts requests to profile, checkout, and product routes
 * - Routes are filtered through this proxy before being delivered
 */
export const config = {
  matcher: ["/profile", "/checkout", "/products/:path*/:path*"],
};

/**
 * MAIN MIDDLEWARE FUNCTION
 * Protects certain routes and requires authentication for specific pages
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // STEP 1: Skip JSON file requests (API data, assets)
  // These don't need authentication - let them pass through
  if (pathname.endsWith(".json")) {
    return NextResponse.next();
  }

  // STEP 2: Parse URL path into segments
  // Example: "/products/electronics/123" → ["products", "electronics", "123"]
  const pathSegments = pathname.split("/").filter(Boolean);

  // STEP 3: Check if this is a product detail page
  // Protected: /products/[category]/[id] (exactly 3 segments)
  // Unprotected: /products or /products/[category]
  const isProductDetail =
    pathSegments.length === 3 && pathSegments[0] === "products";

  // STEP 4: Check if this is another protected route
  // Protected paths: /profile and /checkout (always need authentication)
  const isOtherProtectedPath =
    pathname.startsWith("/profile") || pathname.startsWith("/checkout");

  // STEP 5: If route is NOT protected, allow access immediately (no auth needed)
  // This skips authentication check for public pages like /products and /products/[category]
  if (!isProductDetail && !isOtherProtectedPath) {
    return NextResponse.next();
  }

  // STEP 6: Get user's session data from authentication
  // If user is logged in, session will contain user info
  // If user is NOT logged in, session will be null
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // STEP 7: If no session, user is not authenticated
  // Redirect to login page (/signin)
  if (!session) {
    const signinUrl = new URL("/signin", request.url);
    // Save current page URL to redirect back after login
    signinUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signinUrl);
  }

  // STEP 8: User has valid session - allow access to protected route
  return NextResponse.next();
}
