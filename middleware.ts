import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/signupcustom", "/signincustom", "/api/webhooks(.*)"],
  // debug : true
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/',
    // '/(api|trpc)(.*)'
  ],
};