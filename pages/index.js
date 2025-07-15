import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import ShrineHero from '../components/ShrineHero';
import ContentShowcase from '../components/ContentShowcase';

export default function Home() {
  const [featuredTheories, setFeaturedTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const theoriesRef = useRef(null);
  const ctaRef = useRef(null);
  
  // In-view hooks for scroll reveals
  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 });
  const featuresInView = useInView(featuresRef, { once: true, threshold: 0.2 });
  const theoriesInView = useInView(theoriesRef, { once: true, threshold: 0.1 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.3 });
  
  // Parallax scroll effect
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);
  const featuresY = useTransform(scrollY, [200, 600], [50, -50]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  useEffect(() => {
    const loadFeaturedTheories = async () => {
      try {
        // Simulate API call with delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setFeaturedTheories([
          {
            id: 1,
            title: "The True Power of Luffy's Gear 5",
            excerpt: "An analysis of how Gear 5 might connect to ancient powers and the will of D. This theory explores the mystical connection between Joy Boy and modern pirates.",
            author: "Theory Master",
            likes: 150,
            category: "One Piece",
            date: "2 days ago",
            comments: 23
          },
          {
            id: 2,
            title: "Hidden Connections in Attack on Titan",
            excerpt: "Exploring the deeper meanings behind the titans and their connection to memories, exploring how the Attack Titan's ability to see future memories creates paradoxes.",
            author: "AoT Theorist",
            likes: 203,
            category: "Attack on Titan", 
            date: "1 week ago",
            comments: 45
          },
          {
            id: 3,
            title: "Demon Slayer: The Real Purpose of Breathing Techniques",
            excerpt: "Why breathing techniques might be more than just combat moves. An exploration of how they connect to spiritual enlightenment and ancient traditions.",
            author: "Hashira Theory",
            likes: 89,
            category: "Demon Slayer",
            date: "3 days ago",
            comments: 12
          }
        ]);
      } catch (error) {
        console.error('Failed to load theories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedTheories();
  }, []);

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
          <motion.div 
            ref={heroRef}
            style={{ y: heroY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ShrineHero />
          </motion.div>

          {/* Content Showcase Section */}
          <motion.div
            ref={featuresRef}
            style={{ y: featuresY }}
            variants={containerVariants}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <ContentShowcase />
          </motion.div>

          {/* Featured Theories */}
          <motion.section 
            ref={theoriesRef}
            className="py-16 bg-bg-dark-secondary/50"
            variants={containerVariants}
            initial="hidden"
            animate={theoriesInView ? "visible" : "hidden"}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mystical-title text-center mb-12 text-purple glow-text">
                  Featured Theories
                </h2>
              </motion.div>
              
              {isLoading ? (
                <motion.div 
                  className="flex justify-center items-center py-12"
                  variants={itemVariants}
                >
                  <motion.div 
                    className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              ) : (
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={staggerVariants}
                  initial="hidden"
                  animate={theoriesInView ? "visible" : "hidden"}
                >
                  {featuredTheories.map((theory, index) => (
                    <motion.article 
                      key={theory.id}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      className="bg-dark-purple/30 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 border border-purple/20 shrine-glow cursor-pointer"
                    >
                      <header className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-purple line-clamp-2 mystical-title">
                          {theory.title}
                        </h3>
                        {theory.category && (
                          <span className="text-xs text-text-muted bg-black/50 px-2 py-1 rounded border border-purple/30">
                            {theory.category}
                          </span>
                        )}
                      </header>
                      
                      <p className="text-text-muted mb-4 line-clamp-3 brush-font">
                        {theory.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                        <span>By {theory.author}</span>
                        <span>{theory.date}</span>
                      </div>
                      
                      <footer className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          <span className="flex items-center space-x-1 text-purple">
                            <span>👍</span>
                            <span>{theory.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1 text-grey">
                            <span>💬</span>
                            <span>{theory.comments}</span>
                          </span>
                        </div>
                        
                        <Link
                          href={`/theories/${theory.id}`}
                          className="bg-purple/20 hover:bg-purple/30 text-purple px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-purple ink-brush-edge"
                        >
                          Read More
                        </Link>
                      </footer>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section 
            ref={ctaRef}
            className="py-16 bg-gradient-to-r from-dark-purple/50 to-purple/50"
            variants={containerVariants}
            initial="hidden"
            animate={ctaInView ? "visible" : "hidden"}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-6 mystical-title glow-text text-white">
                  Join the Mystical Community
                </h2>
                <p className="text-xl text-grey mb-8 brush-font max-w-2xl mx-auto">
                  Share your theories, debate with fellow fans, and dive deep into the mystical world of anime. 
                  Become part of a community that celebrates the art of storytelling.
                </p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  variants={staggerVariants}
                >
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/theories"
                      className="inline-block bg-purple hover:bg-dark-purple text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-black shrine-glow"
                    >
                      Start Theorizing
                    </Link>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/discovery"
                      className="inline-block border-2 border-purple text-purple hover:bg-purple hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-black"
                    >
                      Discover Content
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
