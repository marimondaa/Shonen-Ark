import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TheoryCard from '../src/components/features/TheoryCard';
import MangaGrid from '../src/components/manga/MangaGrid';
import MangaPanel from '../src/components/manga/MangaPanel';
import { mockTheories, filterTheoriesByAnime, sortContent } from '../src/lib/utils/mockData';

export default function TheoriesPage() {
  const [theories, setTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadTheories = async () => {
      try {
        setIsLoading(true);
        
        // For build time, use mock data (Supabase integration for runtime)
        let filteredTheories = filterTheoriesByAnime(mockTheories, filter);
        let sortedTheories = sortContent(filteredTheories, sortBy);
        setTheories(sortedTheories);
        
      } catch (error) {
        console.error('Failed to load theories:', error);
        // Fallback to mock data
        let filteredTheories = filterTheoriesByAnime(mockTheories, filter);
        let sortedTheories = sortContent(filteredTheories, sortBy);
        setTheories(sortedTheories);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheories();
  }, [filter, sortBy]);

  const animeOptions = ['all', 'One Piece', 'Jujutsu Kaisen', 'Attack on Titan', 'Demon Slayer'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' }
  ];

  return (
    <div className="min-h-screen bg-white text-black dark:bg-background dark:text-text-light transition-colors">
      {/* Hero Section */}
      <motion.div 
        className="manga-panel mx-4 mt-4 bg-white text-black dark:bg-gradient-to-r dark:from-dark-purple dark:to-purple dark:text-white py-20 transition-colors"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-6xl mb-6">🔮</div>
            <h1 className="text-5xl font-bold font-manga-header mb-6 manga-accent uppercase tracking-widest">
              Fan Theories
            </h1>
            <p className="text-xl text-paper-beige/90 font-manga-body max-w-3xl mx-auto">
              Dive deep into the mysteries of your favorite anime with theories, analysis, and predictions from the community
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div 
          className="manga-card flex flex-col gap-6 mb-8 p-6 bg-dark-purple/30 rounded-lg border border-purple/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Anime Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-purple font-manga-header font-medium whitespace-nowrap uppercase tracking-wide">Filter by anime:</span>
            <div className="flex flex-wrap gap-2">
              {animeOptions.map((anime) => (
                <button
                  key={anime}
                  onClick={() => setFilter(anime)}
                  className={`px-3 py-2 rounded-lg border transition-all text-sm font-manga-body font-medium ${
                    filter === anime
                      ? 'bg-purple text-paper-beige border-purple'
                      : 'border-purple/30 text-purple hover:border-purple/50 hover:bg-purple/10'
                  }`}
                >
                  {anime}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-purple font-medium whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-purple/50 border border-purple/30 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-purple w-full sm:w-auto"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <motion.div 
              className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <>
            {/* Theories Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {theories.map((theory, index) => (
                <motion.div
                  key={theory.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <TheoryCard theory={theory} />
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <button className="bg-purple hover:bg-dark-purple text-white px-8 py-3 rounded-lg transition-colors font-medium">
                Load More Theories
              </button>
            </motion.div>
          </>
        )}

        {/* Call to Action - Enhanced with Manga Panel */}
        <MangaPanel 
          panelNumber="CTA" 
          type="focus" 
          sfx="JOIN US!"
          className="mt-20 text-center p-12"
        >
          <div className="text-4xl mb-4">✨</div>
          <h2 className="text-3xl font-bold font-manga-header mb-4 text-purple uppercase tracking-widest">
            Have a Theory?
          </h2>
          <p className="text-paper-beige/80 font-manga-body mb-6 max-w-2xl mx-auto">
            Join our community of theorists and share your insights about your favorite anime series.
          </p>
          <Link href="/account/creator">
            <motion.button
              className="bg-purple hover:bg-dark-purple text-paper-beige px-8 py-3 rounded-lg transition-colors font-manga-header uppercase tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Share Your Theory
            </motion.button>
          </Link>
        </MangaPanel>
      </div>
    </div>
  );
}
