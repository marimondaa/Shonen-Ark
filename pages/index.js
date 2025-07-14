import Head from 'next/head';
import ShrineHero from '../components/ShrineHero';
import ContentShowcase from '../components/ContentShowcase';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Shonen Ark - Mystical Fan Theories & Anime Universe</title>
        <meta name="description" content="Dive into the mystical world of shonen anime with fan theories, character analysis, and community discussions." />
      </Head>

      <div className="relative overflow-x-hidden">
        {/* Main Content */}
        <div className="relative z-10">
          {/* Hero Section with Shrine Background */}
          <ShrineHero />

          {/* Content Showcase Section */}
          <ContentShowcase />

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}
