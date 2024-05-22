import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const accessTokenCookie = cookies().get("accessToken");

  if (!accessTokenCookie || accessTokenCookie.value === undefined) {
    // Redirect to signin if no access token found
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If there's a valid access token, continue processing the request
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
