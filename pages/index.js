import Head from 'next/head';
import { motion } from 'framer-motion';
import ShrineHero from '../components/ShrineHero';

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
          {/* Hero Section with Shrine Background and Particle Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ShrineHero />
          </motion.div>
        </div>
      </div>
    </>
  );
}
