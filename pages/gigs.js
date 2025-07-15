import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function GigsPage() {
  const [isEarlyAccess, setIsEarlyAccess] = useState(false);

  return (
    <>
      <Head>
        <title>Gigs - Shonen Ark</title>
        <meta name="description" content="Coming Soon: Community work and job opportunities for anime creators" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-b from-purple-900 to-black py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-8xl mb-6">💼</div>
              <h1 className="text-5xl font-bold mb-6 mystical-title glow-text">
                Gigs & Community Work
              </h1>
              <p className="text-xl text-purple-200 mb-8 brush-font">
                Connect with fellow creators and find opportunities in the anime community
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Coming Soon Content */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-purple">Coming Soon</h2>
            
            {/* Feature Preview Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <motion.div 
                className="bg-gradient-to-br from-purple-900/30 to-black/50 p-8 rounded-lg border border-purple/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">🎤</div>
                <h3 className="text-xl font-bold mb-3 text-white">Voice Actor Gigs</h3>
                <p className="text-grey text-sm">
                  Find voice acting opportunities for fan projects and original content
                </p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-purple-900/30 to-black/50 p-8 rounded-lg border border-purple/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold mb-3 text-white">Animation Projects</h3>
                <p className="text-grey text-sm">
                  Collaborate on animations and find skilled animators for your projects
                </p>
              </motion.div>

              <motion.div 
                className="bg-gradient-to-br from-purple-900/30 to-black/50 p-8 rounded-lg border border-purple/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl mb-4">🎵</div>
                <h3 className="text-xl font-bold mb-3 text-white">Music & Sound</h3>
                <p className="text-grey text-sm">
                  Commission original soundtracks and sound effects for your content
                </p>
              </motion.div>
            </div>

            {/* Planned Features */}
            <motion.div 
              className="bg-dark-purple/20 p-8 rounded-lg border border-purple/30 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-purple">Planned Features</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-white mb-2">📋 Job Postings</h4>
                  <p className="text-grey text-sm">
                    Post and find contract work for anime-related projects ($10 posting fee)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">🤝 Community Collaboration</h4>
                  <p className="text-grey text-sm">
                    Team up on passion projects for the love of anime and recognition
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">💰 Secure Payments</h4>
                  <p className="text-grey text-sm">
                    Protected transactions and milestone-based payments for projects
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">⭐ Creator Ratings</h4>
                  <p className="text-grey text-sm">
                    Build your reputation with community reviews and portfolio showcases
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Early Access Signup */}
            <motion.div 
              className="bg-gradient-to-r from-purple to-dark-purple p-8 rounded-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Get Early Access</h3>
              <p className="text-purple-100 mb-6">
                Be the first to know when Gigs launches and get exclusive early access
              </p>
              
              {!isEarlyAccess ? (
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                  />
                  <button 
                    onClick={() => setIsEarlyAccess(true)}
                    className="px-8 py-3 bg-white text-purple font-semibold rounded-lg hover:bg-white/90 transition-colors"
                  >
                    Notify Me
                  </button>
                </div>
              ) : (
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="text-4xl mb-4">✅</div>
                  <p className="text-white text-lg font-semibold">You're on the list!</p>
                  <p className="text-purple-200">We'll notify you when Gigs goes live</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
