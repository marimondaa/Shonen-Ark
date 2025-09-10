import Head from 'next/head';
import { motion } from 'framer-motion';
import MangaPanel from '../src/components/manga/MangaPanel';
import MangaSpeechBubble from '../src/components/manga/MangaSpeechBubble';
import MangaGrid from '../src/components/manga/MangaGrid';

export default function MangaShowcase() {
  return (
    <>
      <Head>
        <title>Manga Showcase - Shonen Ark</title>
        <meta name="description" content="Experience the new manga-inspired interface of Shonen Ark with interactive panels and effects." />
      </Head>

      <div className="min-h-screen bg-ink-black text-paper-beige py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.header 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="manga-title text-6xl mb-6 text-purple glow-text">
              MANGA SHOWCASE
            </h1>
            <p className="manga-subtitle text-xl text-paper-beige/80 max-w-3xl mx-auto">
              Experience the evolution of Shonen Ark with interactive manga panels, 
              speech bubbles, and dynamic effects inspired by your favorite manga.
            </p>
          </motion.header>

          {/* Interactive Demo Section */}
          <section className="mb-16">
            <h2 className="manga-title text-3xl mb-8 text-center text-purple">
              Interactive Panel Demo
            </h2>
            
            <MangaGrid columns="2" className="mb-8">
              <MangaPanel 
                panelNumber="01" 
                type="focus" 
                sfx="WHOOSH!"
                className="relative min-h-[300px] flex items-center justify-center"
              >
                <div className="text-center">
                  <h3 className="manga-title text-2xl mb-4">Focus Panel</h3>
                  <p className="manga-body">Click me to see the WHOOSH effect!</p>
                </div>
                <MangaSpeechBubble 
                  type="normal" 
                  character="Narrator"
                  position="bottom-right"
                >
                  This panel demonstrates focus lines and interactive sound effects!
                </MangaSpeechBubble>
              </MangaPanel>

              <MangaPanel 
                panelNumber="02" 
                type="action" 
                sfx="BOOM!"
                className="relative min-h-[300px] flex items-center justify-center"
              >
                <div className="text-center">
                  <h3 className="manga-title text-2xl mb-4">Action Panel</h3>
                  <p className="manga-body">Action lines and dynamic effects!</p>
                </div>
                <MangaSpeechBubble 
                  type="shout" 
                  character="Hero"
                  position="top-left"
                >
                  AMAZING POWER!
                </MangaSpeechBubble>
              </MangaPanel>
            </MangaGrid>
          </section>

          {/* Speech Bubble Variations */}
          <section className="mb-16">
            <h2 className="manga-title text-3xl mb-8 text-center text-purple">
              Speech Bubble Types
            </h2>
            
            <MangaGrid columns="3">
              <MangaPanel 
                panelNumber="03" 
                className="relative min-h-[250px] flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">😊</div>
                  <h4 className="manga-subtitle">Normal Speech</h4>
                </div>
                <MangaSpeechBubble 
                  type="normal" 
                  character="Character A"
                  position="bottom-left"
                >
                  This is normal dialogue with a clean, readable style.
                </MangaSpeechBubble>
              </MangaPanel>

              <MangaPanel 
                panelNumber="04" 
                className="relative min-h-[250px] flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🤔</div>
                  <h4 className="manga-subtitle">Thought Bubble</h4>
                </div>
                <MangaSpeechBubble 
                  type="thought" 
                  character="Character B"
                  position="top-right"
                >
                  These are internal thoughts, shown in a different style...
                </MangaSpeechBubble>
              </MangaPanel>

              <MangaPanel 
                panelNumber="05" 
                className="relative min-h-[250px] flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">😤</div>
                  <h4 className="manga-subtitle">Shout/Exclamation</h4>
                </div>
                <MangaSpeechBubble 
                  type="shout" 
                  character="Character C"
                  position="center"
                >
                  LOUD DRAMATIC SPEECH!
                </MangaSpeechBubble>
              </MangaPanel>
            </MangaGrid>
          </section>

          {/* Features Overview */}
          <section className="mb-16">
            <h2 className="manga-title text-3xl mb-8 text-center text-purple">
              Phase 3 Features
            </h2>
            
            <div className="manga-card p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="manga-subtitle text-xl mb-4 text-purple">✨ Interactive Elements</h3>
                  <ul className="manga-body space-y-2 text-paper-beige/80">
                    <li>• Clickable manga panels with sound effects</li>
                    <li>• Hover animations and focus lines</li>
                    <li>• Sequential panel reveal animations</li>
                    <li>• Dynamic speech bubble positioning</li>
                  </ul>
                </div>
                <div>
                  <h3 className="manga-subtitle text-xl mb-4 text-purple">🎨 Visual Enhancements</h3>
                  <ul className="manga-body space-y-2 text-paper-beige/80">
                    <li>• Advanced panel transition effects</li>
                    <li>• Multiple speech bubble styles</li>
                    <li>• Action lines and speed effects</li>
                    <li>• Responsive manga grid layouts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Back */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <a 
              href="/"
              className="inline-block bg-purple hover:bg-purple/80 text-paper-beige px-8 py-4 rounded-lg font-manga-header text-lg tracking-widest border-2 border-purple transition-all duration-300 uppercase"
            >
              ← Back to Home
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
}
