import '../styles/globals.css'
import VerticalNav from '../components/VerticalNav'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo/shonen-ark/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/shonen-ark/ICO/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/shonen-ark/ICO/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/shonen-ark/ICO/apple-touch-icon.png" />
        <link rel="manifest" href="/images/logo/shonen-ark/ICO/site.webmanifest" />
      </Head>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
        <VerticalNav />
        <main className="ml-16 md:ml-20 min-h-screen">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}
