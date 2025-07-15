import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists in Supabase
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error fetching user:', fetchError);
          return false;
        }

        // Create user if doesn't exist
        if (!existingUser) {
          const { error: insertError } = await supabase
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              name: user.name,
              avatar: user.image,
              provider: account.provider,
              provider_id: account.providerAccountId,
              account_type: 'fan', // Default to fan account
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });

          if (insertError) {
            console.error('Error creating user:', insertError);
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },

    async session({ session, token }) {
      try {
        // Fetch user data from Supabase
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          return session;
        }

        // Add user data to session
        session.user.id = userData.id;
        session.user.accountType = userData.account_type;
        session.user.subscriptionTier = userData.subscription_tier;
        session.user.createdAt = userData.created_at;

        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },

  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/account/onboarding'
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
});
