import Head from 'next/head';
import { motion } from 'framer-motion';
import NavMenu from '../components/NavMenu';
import ScrollFX from '../components/ScrollFX';

export default function Home() {
  return (
    <>
      <Head>
        <title>Shonen Ark - Fan Theories & Media Hub</title>
        <meta name="description" content="The ultimate destination for shonen anime fan theories, analysis, and community content." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-[#0e0e0e] relative overflow-hidden">
        {/* Mystical Background Shrine */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img 
            src="/assets/illustrations/shrine-ink-hero.png" 
            alt="" 
            className="w-full h-full object-cover opacity-20 blur-sm scale-110"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-generous">
          {/* Mystical Title */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light text-text-light mb-generous md:mb-generous text-center tracking-widest mystical-title mystical-glow"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            Shonen Ark
          </motion.h1>

          {/* Animated Navigation Menu */}
          <NavMenu />

          {/* Future Interactive Elements - Placeholders with Bokoko33 spacing */}
          <div className="mt-generous md:mt-generous w-full max-w-5xl mx-auto">
            {/* Bonsai Placeholder */}
            <ScrollFX fadeDirection="up" className="mb-generous-sm md:mb-generous">
              <div id="bonsai" className="h-32 w-full flex items-center justify-center">
                <motion.div 
                  className="w-3 h-3 bg-accent-pink/40 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </ScrollFX>

            {/* Incense Placeholder */}
            <ScrollFX fadeDirection="up" className="mb-generous-sm md:mb-generous">
              <div id="incense" className="h-32 w-full flex items-center justify-center">
                <motion.div 
                  className="w-2 h-12 bg-gradient-to-t from-accent-beige/30 to-transparent rounded-full"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </ScrollFX>

            {/* Monk Character Placeholder */}
            <ScrollFX fadeDirection="up">
              <div id="monk" className="h-40 w-full flex items-center justify-center">
                <motion.div 
                  className="w-4 h-4 bg-accent-rose/30 rounded-full"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </ScrollFX>
          </div>
        </div>

        {/* Enhanced Ambient Particles with Bokoko33 Colors */}
        <div className="absolute inset-0 pointer-events-none z-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                i % 3 === 0 ? 'bg-accent-pink/20' : 
                i % 3 === 1 ? 'bg-accent-beige/15' : 
                'bg-accent-rose/10'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </main>
    </>
  )
}
