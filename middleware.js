import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Check if user has active subscription for creator routes
    if (req.nextUrl.pathname.startsWith('/account/creator')) {
      const token = req.nextauth.token;
      
      if (!token?.subscriptionStatus || token.subscriptionStatus !== 'active') {
        return Response.redirect(new URL('/account/onboarding', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        if (req.nextUrl.pathname.startsWith('/account/fan')) {
          return !!token;
        }
        
        // Require authentication for all account routes
        if (req.nextUrl.pathname.startsWith('/account')) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/account/:path*']
};
