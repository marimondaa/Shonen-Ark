import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function FanAccount() {
  const [feedData, setFeedData] = useState([]);
  const [stats, setStats] = useState({ following: 0, bookmarks: 0, comments: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setFeedData([
          {
            id: 1,
            creator: "TheoryMaster",
            type: "theory",
            title: "The Hidden Meaning Behind Luffy's Gear 5",
            preview: "Deep analysis of the mythological connections...",
            timestamp: "2 hours ago",
            likes: 234,
            comments: 45
          },
          {
            id: 2,
            creator: "AnimationPro",
            type: "animation",
            title: "Sasuke vs Naruto Fight Recreation",
            preview: "Frame-by-frame recreation of the final battle",
            timestamp: "5 hours ago",
            likes: 567,
            comments: 89
          }
        ]);

        setStats({ following: 15, bookmarks: 23, comments: 47 });
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Head>
        <title>Fan Dashboard - Shonen Ark</title>
        <meta name="description" content="Your personalized fan dashboard for following creators and managing content." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <motion.header 
          className="bg-gradient-to-r from-dark-purple/80 to-purple/80 py-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">👤</div>
            <h1 className="text-4xl font-bold mystical-title mb-4 glow-text">Fan Dashboard</h1>
            <p className="text-xl text-grey brush-font">Welcome back! Stay connected with your favorite creators.</p>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <motion.div 
                className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <motion.div 
                className="lg:col-span-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <h2 className="text-2xl font-bold mystical-title mb-6 text-purple">Creator Feed</h2>
                <div className="space-y-6">
                  {feedData.map((post) => (
                    <motion.article
                      key={post.id}
                      variants={itemVariants}
                      className="bg-dark-purple/30 rounded-lg p-6 border border-purple/20 hover:border-purple/50 transition-all shrine-glow"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                          <span className="text-purple font-bold">{post.creator.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-bold text-purple">{post.creator}</h3>
                            <span className="text-grey text-sm">•</span>
                            <span className="text-grey text-sm">{post.timestamp}</span>
                            <span className="text-xs px-2 py-1 rounded bg-purple/20 text-purple">
                              {post.type}
                            </span>
                          </div>
                          <h4 className="text-lg font-semibold text-white mb-2">{post.title}</h4>
                          <p className="text-grey mb-4">{post.preview}</p>
                          <div className="flex items-center space-x-6 text-sm text-grey">
                            <button className="flex items-center space-x-1 hover:text-purple transition-colors">
                              <span>👍</span>
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-purple transition-colors">
                              <span>💬</span>
                              <span>{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-purple transition-colors">
                              <span>🔖</span>
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Quick Stats */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-dark-purple/30 rounded-lg p-6 border border-purple/20"
                >
                  <h3 className="text-lg font-bold mystical-title mb-4 text-purple">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-grey">Following</span>
                      <span className="text-purple font-bold">{stats.following}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-grey">Bookmarks</span>
                      <span className="text-purple font-bold">{stats.bookmarks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-grey">Comments</span>
                      <span className="text-purple font-bold">{stats.comments}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Upgrade CTA */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-purple/20 to-dark-purple/20 rounded-lg p-6 border border-purple/30 text-center"
                >
                  <div className="text-4xl mb-3">⭐</div>
                  <h3 className="text-lg font-bold mystical-title mb-2 text-purple">Become a Creator</h3>
                  <p className="text-grey text-sm mb-4">
                    Upload your own theories, animations, and audio content.
                  </p>
                  <button className="w-full bg-purple hover:bg-purple/80 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Upgrade for $4/month
                  </button>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
