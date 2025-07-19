// NextAuth configuration for Shonen Ark
import { getServerSession } from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  
  pages: {
    signIn: '/login',
    signUp: '/register',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth account info and user info to the token
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.role = user.role || 'fan';
        token.subscriptionStatus = user.subscriptionStatus || 'free';
      }
      return token;
    },
    
    async session({ session, token }) {
      // Add user info to session
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.subscriptionStatus = token.subscriptionStatus;
      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      // Check if user is allowed to sign in
      if (account.provider === 'email') {
        return true; // Allow email sign-in
      }
      
      if (account.provider === 'google' || account.provider === 'github') {
        return true; // Allow OAuth sign-in
      }
      
      return false;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign-in
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/account/fan`;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  theme: {
    colorScheme: 'dark',
    brandColor: '#8B5CF6', // Purple theme
    logo: '/assets/images/logo/shonen-ark/symbol-192x192.png',
  },

  debug: process.env.NODE_ENV === 'development',
};

// Server-side auth check
export async function getAuthSession() {
  return await getServerSession(authOptions);
}

// Auth utilities
export const auth = {
  // Check if user is authenticated
  async isAuthenticated() {
    const session = await getAuthSession();
    return !!session?.user;
  },

  // Check if user has creator subscription
  async isCreator() {
    const session = await getAuthSession();
    return session?.user?.subscriptionStatus === 'creator';
  },

  // Get current user
  async getCurrentUser() {
    const session = await getAuthSession();
    return session?.user || null;
  },

  // Check user role
  async hasRole(role) {
    const session = await getAuthSession();
    return session?.user?.role === role;
  },

  // Check subscription status
  async hasSubscription(status = 'creator') {
    const session = await getAuthSession();
    return session?.user?.subscriptionStatus === status;
  },
};

export default authOptions;
