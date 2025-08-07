import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// This is the case where we define our public route
const isPublicRoute = createRouteMatcher(['/','/products(.*)','/about'])

export default clerkMiddleware((auth, req) => {
    // These are going to be public routes
    // We will actually look for the routes that are not in our createRouteMatcher
     if (!isPublicRoute(req)) {
        auth.protect()// Protect the route if it matches the defined criteria
    }
    
});

export const config = {
    // Skip Next.js internals and all static files, unless found in search params
    // Always run for API routes
     matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};