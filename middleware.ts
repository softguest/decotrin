import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return; // ✅ skip middleware for API auth routes
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // ✅ redirect logged-in users away from login/register
  }

  if (!isLoggedIn && !isPublicRoute) {
    const callbackUrl = `${nextUrl.pathname}${nextUrl.search}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next(); // ✅ continue to next middleware or route
});

// Only match specific routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
