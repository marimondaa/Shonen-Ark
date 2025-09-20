import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { getDiscoveryContent, sortContent } from '../../src/lib/utils/mockData';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const gridInView = useInView(gridRef, { once: true });

  // Category configurations
  const categoryConfig = {
    'fan-fights': {
      title: 'Fan Fights',
      description: 'Epic battles and power scaling debates from the community',
      icon: '⚔️',
      color: 'purple'
    },
    'audio-fx': {
      title: 'Audio FX',
      description: 'Sound effects, music covers, and audio content',
      icon: '🎵',
      color: 'dark-purple'
    },
    'character-designs': {
      title: 'Character Designs',
      description: 'Fan art, redesigns, and character analysis',
      icon: '🎨',
      color: 'purple'
    },
    'animations': {
      title: 'Animations',
      description: 'Fan-made animations and motion graphics',
      icon: '🎬',
      color: 'dark-purple'
    }
  };

  const currentCategory = categoryConfig[category] || {
    title: 'Discovery',
    description: 'Explore fan content',
    icon: '🔍',
    color: 'purple'
  };

  useEffect(() => {
    if (!category) return;

    const loadCategoryItems = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Use centralized mock data
        const categoryItems = getDiscoveryContent(category);
        const sortedItems = sortContent(categoryItems, sortBy);
        setItems(sortedItems);
      } catch (error) {
        console.error('Failed to load category items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryItems();
  }, [category, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Head>
        <title>{currentCategory.title} - Shonen Ark Discovery</title>
        <meta name="description" content={currentCategory.description} />
      </Head>

  <div className="min-h-screen dark:bg-black dark:text-white transition-colors">
        {/* Header */}
        <motion.header 
          ref={headerRef}
          className="dark:bg-gradient-to-r dark:from-dark-purple/80 dark:to-purple/80 dark:text-white py-16 transition-colors"
          initial={{ opacity: 0, y: -50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              variants={itemVariants}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
            >
              <div className="text-6xl mb-4">{currentCategory.icon}</div>
              <h1 className="text-4xl font-bold mystical-title mb-4">
                {currentCategory.title}
              </h1>
              <p className="text-xl max-w-2xl mx-auto text-black/70 dark:text-grey transition-colors brush-font">
                {currentCategory.description}
              </p>
            </motion.div>
          </div>
        </motion.header>

        {/* Filters */}
        <section className="py-8 border-b border-grey/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex space-x-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-purple border border-purple/30 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple"
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="likes">Most Liked</option>
                  <option value="views">Most Viewed</option>
                </select>
              </div>
              
              <Link 
                href="/discovery"
                className="text-purple hover:text-white transition-colors"
              >
                ← Back to Discovery
              </Link>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <motion.section 
          ref={gridRef}
          className="py-12"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <motion.div 
                  className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : items.length > 0 ? (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {items.map((item) => (
                  <motion.article
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, rotateY: 2 }}
                    className="bg-dark-purple/30 rounded-lg overflow-hidden border border-purple/20 hover:border-purple/50 transition-all duration-300 shrine-glow"
                  >
                    <div className="aspect-video bg-gradient-to-br from-purple/20 to-dark-purple/20 flex items-center justify-center">
                      <span className="text-4xl">{currentCategory.icon}</span>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 mystical-title line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-grey text-sm mb-4">
                        By {item.creator} • {item.date}
                      </p>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex space-x-4 text-grey">
                          <span className="flex items-center space-x-1">
                            <span>👍</span>
                            <span>{item.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>👁️</span>
                            <span>{item.views}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <span>💬</span>
                            <span>{item.comments}</span>
                          </span>
                        </div>
                        
                        <span className="text-purple text-xs font-semibold uppercase">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-16"
                variants={itemVariants}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-grey mb-4">No content found</h3>
                <p className="text-grey">Be the first to upload content in this category!</p>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </>
  );
}
