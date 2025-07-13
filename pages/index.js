import Head from 'next/head';
import ShrineHero from '../components/ShrineHero';
import VerticalNav from '../components/VerticalNav';
import ContentShowcase from '../components/ContentShowcase';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Shonen Ark - Mystical Fan Theories & Anime Universe</title>
        <meta name="description" content="Dive into the mystical world of shonen anime with fan theories, character analysis, and community discussions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-ink-black relative overflow-x-hidden">
        {/* Fixed Navigation */}
        <VerticalNav />

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section with Shrine Background */}
          <ShrineHero />

          {/* Content Showcase Section */}
          <ContentShowcase />

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
}
