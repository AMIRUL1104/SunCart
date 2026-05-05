import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  //  data request skip
  if (pathname.endsWith(".json")) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // যদি সেশন না থাকে (ইউজার লগইন করা নেই)
  if (!session) {
    const signinUrl = new URL("/signin", request.url);

    // save request url for redirect user in request page
    signinUrl.searchParams.set("callbackUrl", request.url);
    // return directly in signin page
    return NextResponse.redirect(signinUrl);
  }

  // if session true continue user request
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/profile", "/checkout", "/products/:path*/:path*"],
};
