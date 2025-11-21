import { SessionProvider } from 'next-auth/react'
import ParticleCursor from '../components/ParticleCursor'
import '../styles/globals.css'
import Layout from '../src/components/layout/Layout'
import { AuthProvider } from '../src/lib/hooks/useAuth'
import Head from 'next/head'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/logo/shonen-ark/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Shonen Ark - Mystical Anime Fan Platform</title>
        <meta name="description" content="Mystical anime fan platform featuring fusion UI design. Interactive theory hub, animation analysis, creator community." />
      </Head>
      <SessionProvider session={session}>
        <AuthProvider>
          <div className="transition-colors duration-200 dark:bg-background dark:text-text-light">
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ParticleCursor />
          </div>
        </AuthProvider>
      </SessionProvider>
    </>
  )
}
