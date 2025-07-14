/**
 * Authentication utilities for Shonen Ark
 * Handles NextAuth configuration and session management
 */

/**
 * NextAuth configuration options
 * This will be used in pages/api/auth/[...nextauth].js
 */
export const authOptions = {
  providers: [
    // Google OAuth
    {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      wellKnown: 'https://accounts.google.com/.well-known/openid_configuration',
      authorization: { params: { scope: 'openid email profile' } },
      idToken: true,
      checks: ['pkce', 'state'],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: 'google'
        };
      }
    },
    
    // Discord OAuth
    {
      id: 'discord',
      name: 'Discord',
      type: 'oauth',
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email',
      token: 'https://discord.com/api/oauth2/token',
      userinfo: 'https://discord.com/api/users/@me',
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.image_url,
          provider: 'discord'
        };
      }
    },
    
    // Email/Password provider
    {
      id: 'credentials',
      name: 'Email',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // In production, validate against your database
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // Mock user validation - replace with real database check
        const user = await validateUserCredentials(credentials.email, credentials.password);
        return user;
      }
    }
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and refresh_token to the token right after signin
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
        token.userId = user.id;
        
        // Create or update user in database
        await handleUserSignIn(user, account);
      }
      return token;
    },
    
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.accessToken = token.accessToken;
        session.userId = token.userId;
        session.provider = token.provider;
        
        // Get additional user data from database
        const userData = await getUserData(token.userId);
        if (userData) {
          session.user = { ...session.user, ...userData };
        }
      }
      return session;
    },
    
    async signIn({ user, account, profile }) {
      // Allow sign in
      return true;
    },
    
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/account/onboarding'
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  
  secret: process.env.NEXTAUTH_SECRET
};

/**
 * Mock user validation for credentials provider
 * Replace with actual database validation
 */
async function validateUserCredentials(email, password) {
  // Simulate database lookup
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock user data - in production, hash passwords and store in database
  const mockUsers = [
    {
      id: 'user1',
      email: 'demo@shonenark.com',
      password: 'demo123', // In production, this should be hashed
      name: 'Demo User',
      image: null
    }
  ];
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      provider: 'credentials'
    };
  }
  
  return null;
}

/**
 * Handle user sign-in, create or update user in database
 */
async function handleUserSignIn(user, account) {
  // Mock database operation
  console.log('Creating/updating user:', user.email);
  
  // In production, use your database client to:
  // 1. Check if user exists
  // 2. Create new user if doesn't exist
  // 3. Update existing user data if needed
  // 4. Set default account type (fan)
  
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
    accountType: 'fan', // Default to fan account
    createdAt: new Date(),
    provider: account.provider
  };
}

/**
 * Get additional user data from database
 */
async function getUserData(userId) {
  // Mock database lookup
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Mock user data - replace with actual database query
  return {
    accountType: 'fan',
    isVerified: false,
    followers: 0,
    following: 0,
    totalPosts: 0,
    joinDate: new Date('2024-01-01'),
    preferences: {
      theme: 'dark',
      notifications: true,
      publicProfile: true
    }
  };
}

/**
 * Check if user has required subscription level
 * @param {Object} session - NextAuth session
 * @param {string} requiredLevel - Required subscription level
 * @returns {boolean} - Whether user has access
 */
export function hasSubscriptionAccess(session, requiredLevel = 'fan') {
  if (!session?.user) return false;
  
  const subscriptionLevels = {
    fan: 0,
    creator: 1,
    sensei: 2
  };
  
  const userLevel = subscriptionLevels[session.user.accountType] || 0;
  const required = subscriptionLevels[requiredLevel] || 0;
  
  return userLevel >= required;
}

/**
 * Middleware to protect routes
 * @param {Function} handler - Route handler
 * @param {Object} options - Protection options
 * @returns {Function} - Protected route handler
 */
export function withAuth(handler, options = {}) {
  return async (req, res) => {
    const session = await getSession({ req });
    
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (options.requireSubscription && !hasSubscriptionAccess(session, options.requireSubscription)) {
      return res.status(403).json({ error: 'Subscription required' });
    }
    
    // Add session to request
    req.session = session;
    return handler(req, res);
  };
}

/**
 * Client-side hook for authentication
 * @returns {Object} - Auth state and methods
 */
export function useAuthClient() {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    accountType: session?.user?.accountType || 'fan',
    hasCreatorAccess: hasSubscriptionAccess(session, 'creator'),
    hasSenseiAccess: hasSubscriptionAccess(session, 'sensei'),
    signIn: signIn,
    signOut: signOut
  };
}

/**
 * Get user's upload limits based on account type
 * @param {string} accountType - User's account type
 * @returns {Object} - Upload limits
 */
export function getUploadLimits(accountType = 'fan') {
  const limits = {
    fan: {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxUploadsPerDay: 5,
      maxStorageTotal: 100 * 1024 * 1024, // 100MB
      allowedTypes: ['image'],
      features: ['follow', 'comment', 'like']
    },
    creator: {
      maxFileSize: 100 * 1024 * 1024, // 100MB
      maxUploadsPerDay: 25,
      maxStorageTotal: 5 * 1024 * 1024 * 1024, // 5GB
      allowedTypes: ['image', 'video', 'audio'],
      features: ['upload', 'analytics', 'monetization', 'priority_support']
    },
    sensei: {
      maxFileSize: 500 * 1024 * 1024, // 500MB
      maxUploadsPerDay: 100,
      maxStorageTotal: 50 * 1024 * 1024 * 1024, // 50GB
      allowedTypes: ['image', 'video', 'audio'],
      features: ['upload', 'analytics', 'monetization', 'priority_support', 'exclusive_content', 'advanced_analytics']
    }
  };
  
  return limits[accountType] || limits.fan;
}

/**
 * Generate user profile completion score
 * @param {Object} user - User object
 * @returns {Object} - Completion score and suggestions
 */
export function getProfileCompletion(user) {
  let score = 0;
  const suggestions = [];
  
  if (user.name) score += 20;
  else suggestions.push('Add your display name');
  
  if (user.image) score += 15;
  else suggestions.push('Upload a profile picture');
  
  if (user.bio) score += 20;
  else suggestions.push('Write a bio');
  
  if (user.favoriteAnime?.length > 0) score += 15;
  else suggestions.push('Add your favorite anime');
  
  if (user.socialLinks?.length > 0) score += 10;
  else suggestions.push('Connect your social media');
  
  if (user.totalPosts > 0) score += 20;
  else suggestions.push('Create your first post');
  
  return {
    score: Math.min(score, 100),
    suggestions: suggestions.slice(0, 3), // Show top 3 suggestions
    isComplete: score >= 80
  };
}

// Export commonly used NextAuth functions for convenience
export { signIn, signOut, useSession } from 'next-auth/react';
export { getSession, getServerSession } from 'next-auth';

export default {
  authOptions,
  hasSubscriptionAccess,
  withAuth,
  useAuthClient,
  getUploadLimits,
  getProfileCompletion
};
