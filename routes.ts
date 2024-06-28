/**
 * These routes are accessible by the public.
 * They do not require authentication.
 * @types {string[]}
 */
export const publicRoutes = ["/", "/jobs", "/companies", "/api/uploadthing"];

/**
 * These routes are used for authentication.
 * These routes will redirect logged in users to their "/dashboard".
 * @types {string[]}
 */
export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/error",
  "/reset-password",
  "/onboarding",
  "/company/sign-up",
];

/**
 * The prefix for api authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @types {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in.
 * @types {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/security-questions";

/**
 * These routes are public dynamic routes and as such, are stored as regex.
 * They do not require authentication.
 * @types {string}
 */
export const dynamicPublicRoutes = [/^\/job\/.*/, /^\/company\/.*/];

/**
 * This route is for the company dashboard.
 * It requires authentication.
 * It needed to be declared and made a private route due to /^\/company\/.* in dynamicPublicRoutes making it public.
 * @types {string}
 */
export const companyDashboardRoute = "/company/dashboard";
