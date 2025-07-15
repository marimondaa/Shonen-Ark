// Higher-order component for subscription protection
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function withSubscription(WrappedComponent, requiredTier = 'creator') {
  return function ProtectedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (status === 'loading') return; // Still loading session

      if (!session) {
        // Not authenticated, redirect to login
        router.push('/login?callbackUrl=' + encodeURIComponent(router.asPath));
        return;
      }

      // Check user subscription/role
      const checkSubscription = async () => {
        try {
          const userRole = session.user?.role || 'fan';
          const subscriptionTier = session.user?.subscription_tier || 'free';
          
          // Check if user has required access
          const hasAccess = 
            userRole === 'admin' || 
            (requiredTier === 'creator' && (subscriptionTier === 'creator' || subscriptionTier === 'creator_pro')) ||
            (requiredTier === 'creator_pro' && subscriptionTier === 'creator_pro');

          setIsAuthorized(hasAccess);
        } catch (error) {
          console.error('Subscription check failed:', error);
          setIsAuthorized(false);
        } finally {
          setIsLoading(false);
        }
      };

      checkSubscription();
    }, [session, status, router, requiredTier]);

    // Loading state
    if (status === 'loading' || isLoading) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <motion.div 
            className="w-16 h-16 border-4 border-purple border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      );
    }

    // Not authorized - show upgrade prompt
    if (!isAuthorized) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-6">🔒</div>
              <h1 className="text-3xl font-bold mb-4 mystical-title text-purple">
                Creator Access Required
              </h1>
              <p className="text-grey mb-8">
                This feature is only available to Creator tier subscribers. 
                Upgrade your account to access premium features and support the platform.
              </p>
              
              <div className="space-y-4">
                <Link href="/account/onboarding">
                  <button className="w-full bg-purple hover:bg-dark-purple text-white px-6 py-3 rounded-lg transition-colors">
                    Upgrade to Creator ($4/month)
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-full border border-purple text-purple hover:bg-purple/10 px-6 py-3 rounded-lg transition-colors">
                    Back to Home
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    // Authorized - render the protected component
    return <WrappedComponent {...props} />;
  };
}

// Server-side protection utility
export async function requireSubscription(context, requiredTier = 'creator') {
  const { req } = context;
  
  // This would integrate with your session/auth system
  // For now, just a basic structure
  
  return {
    props: {
      // Pass any props needed
    }
  };
}

// Middleware function for API routes
export function protectApiRoute(handler, requiredTier = 'creator') {
  return async (req, res) => {
    try {
      // Extract session from request (implement based on your auth system)
      const session = req.session || null;
      
      if (!session) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const userRole = session.user?.role || 'fan';
      const subscriptionTier = session.user?.subscription_tier || 'free';
      
      const hasAccess = 
        userRole === 'admin' || 
        (requiredTier === 'creator' && (subscriptionTier === 'creator' || subscriptionTier === 'creator_pro')) ||
        (requiredTier === 'creator_pro' && subscriptionTier === 'creator_pro');

      if (!hasAccess) {
        return res.status(403).json({ 
          error: 'Insufficient subscription tier',
          required: requiredTier,
          current: subscriptionTier
        });
      }

      return handler(req, res);
    } catch (error) {
      console.error('API protection error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
