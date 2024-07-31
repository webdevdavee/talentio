import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  dynamicPublicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  // Check logged in status
  const isLoggedIn = !!req.auth;

  // Checks the state of the url
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isDynamicPublicRoute = dynamicPublicRoutes.some((pattern) =>
    pattern.test(nextUrl.pathname)
  );

  // Checks if the url is at "/api/auth", if so, do nothing
  if (isApiAuthRoute) {
    return;
  }

  // If a logged in user tries to visit either the sign-in or sign-up page, redirect them to their dashboard page
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // If a user is not logged in but requests a page that is not public, redirect them to the sign-in page
  if (!isLoggedIn && !isPublicRoute && !isDynamicPublicRoute) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
