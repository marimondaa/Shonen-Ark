import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import CredentialsProvider from 'next-auth/providers/credentials'

// NextAuth configuration for Shonen Ark
// Supports Google OAuth, Discord OAuth, and email/password authentication
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_google_secret',
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || 'mock_discord_client_id',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || 'mock_discord_secret',
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Mock validation for development - replace with real database validation
        if (credentials?.email === 'demo@shonenark.com' && credentials?.password === 'demo123') {
          return {
            id: 'demo_user',
            email: 'demo@shonenark.com',
            name: 'Demo User',
            image: null,
            accountType: 'creator'
          };
        }
        
        // Fan account example
        if (credentials?.email === 'fan@shonenark.com' && credentials?.password === 'fan123') {
          return {
            id: 'fan_user',
            email: 'fan@shonenark.com',
            name: 'Fan User',
            image: null,
            accountType: 'fan'
          };
        }
        
        return null;
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist OAuth access_token and user data to the token right after signin
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider;
        token.userId = user.id;
        token.accountType = user.accountType || 'fan';
      }
      return token;
    },
    
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.accessToken = token.accessToken;
        session.userId = token.userId;
        session.provider = token.provider;
        session.user.accountType = token.accountType || 'fan';
        session.user.id = token.userId;
      }
      return session;
    },
    
    async signIn({ user, account, profile }) {
      // Allow sign in - here you could add additional validation
      return true;
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
  
  secret: process.env.NEXTAUTH_SECRET || 'development_secret_please_change_in_production'
});
