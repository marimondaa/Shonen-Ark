// TODO: Install next-auth: npm install next-auth
// import NextAuth from 'next-auth'
// import DiscordProvider from 'next-auth/providers/discord'
// import GoogleProvider from 'next-auth/providers/google'

// For now, this is a placeholder for NextAuth configuration
// Uncomment and configure when next-auth is installed

export default function handler(req, res) {
  // Placeholder for NextAuth
  if (req.method === 'GET') {
    res.status(200).json({ 
      message: 'NextAuth setup pending - install next-auth package',
      providers: ['discord', 'google', 'credentials']
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}

/*
// Future NextAuth configuration:

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add email/password provider
  ],
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      session.user.accountType = token.accountType || 'fan'
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.accountType = user.accountType
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
})
*/
