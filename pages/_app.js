import '../styles/globals.css'
import VerticalNav from '../components/VerticalNav'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/logo/shonen-ark/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
