import '../styles/globals.css'
import '../styles/edition.css'
import '../styles/comic.css'
import Layout from '../src/components/layout/Layout'
import { AuthProvider } from '../src/lib/hooks/useAuth'
import Head from 'next/head'
import { MotionConfig } from 'framer-motion'
import { AppearanceProvider } from '../src/lib/hooks/useAppearance'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/ark-mark.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Shonen Ark</title>
        <meta name="description" content="Find anime and manga, follow daily airings, and share your reading of the story." />
      </Head>
      <MotionConfig reducedMotion="user">
        <AuthProvider><AppearanceProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </AppearanceProvider></AuthProvider>
      </MotionConfig>
    </>
  )
}
