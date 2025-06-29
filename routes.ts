/**
 * An array of routes that can not access the public 
 * These routes do not require authentication
 * @type{string[]}
 */
export const publicRoutes = [
    "/"
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect loggedin users to the to /settings
 * @type{string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API
 * Authentication  purposes.
 * @type{string[]}
 */

export const apiAuthPrefix = "api/auth";


/**
 * The default redirect path after login in
 * @type{string[]}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";