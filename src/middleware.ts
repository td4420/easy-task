// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN, HOME_PAGE, LOGIN_PAGE } from "./utils/const";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = [LOGIN_PAGE];

  // User NOT logged in → redirect to /login
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
  }

  // User logged in → prevent access to login page
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(HOME_PAGE, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Run middleware on all routes
      EXCEPT:
      - _next/static (CSS, JS)
      - _next/image
      - favicon
    */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};