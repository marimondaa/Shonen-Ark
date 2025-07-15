import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import TheoryCard from '../components/TheoryCard';
import { mockTheories, filterTheoriesByAnime, sortContent } from '../lib/mockData';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function TheoriesPage() {
  const [theories, setTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadTheories = async () => {
      try {
        setIsLoading(true);
        
        // Try to fetch from Supabase first
        let theoriesData = [];
        
        try {
          let query = supabase
            .from('theories')
            .select(`
              id,
              title,
              content,
              excerpt,
              anime_series,
              tags,
              upvotes,
              downvotes,
              view_count,
              created_at,
              author:users(username, avatar_url)
            `)
            .eq('moderation_status', 'approved')
            .order('created_at', { ascending: false });

          // Apply anime filter
          if (filter !== 'all') {
            query = query.eq('anime_series', filter);
          }

          const { data, error } = await query;

          if (error) {
            console.error('Supabase error:', error);
            throw error;
          }

          if (data && data.length > 0) {
            // Transform Supabase data to match expected format
            theoriesData = data.map(theory => ({
              id: theory.id,
              title: theory.title,
              excerpt: theory.excerpt || theory.content?.substring(0, 200) + '...',
              author: theory.author?.username || 'Anonymous',
              likes: theory.upvotes || 0,
              comments: 0, // Would need a separate query for comment count
              category: theory.anime_series,
              tags: theory.tags || [],
              date: new Date(theory.created_at).toLocaleDateString()
            }));
          }
        } catch (supabaseError) {
          console.log('Supabase not available, using mock data');
        }

        // Fallback to mock data if Supabase fails or returns no data
        if (theoriesData.length === 0) {
          let filteredTheories = filterTheoriesByAnime(mockTheories, filter);
          theoriesData = filteredTheories;
        }

        // Apply sorting
        let sortedTheories = sortContent(theoriesData, sortBy);
        setTheories(sortedTheories);
        
      } catch (error) {
        console.error('Failed to load theories:', error);
        // Ultimate fallback to mock data
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
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-b from-purple-900 to-black py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="text-8xl mb-6">🧠</div>
            <h1 className="text-5xl font-bold mystical-title mb-4 glow-text">
              Anime Theories
            </h1>
            <p className="text-xl text-purple-200 brush-font max-w-2xl mx-auto">
              Dive deep into the mysteries and hidden meanings of your favorite anime
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div 
          className="flex flex-col gap-6 mb-8 p-4 bg-dark-purple/30 rounded-lg border border-purple/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Anime Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-purple font-medium whitespace-nowrap">Filter by anime:</span>
            <div className="flex flex-wrap gap-2">
              {animeOptions.map((anime) => (
                <button
                  key={anime}
                  onClick={() => setFilter(anime)}
                  className={`px-3 py-2 rounded-lg border transition-all text-sm font-medium ${
                    filter === anime
                      ? 'bg-purple text-white border-purple'
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
                  <TheoryCard
                    title={theory.title}
                    image={theory.image}
                    tags={theory.tags}
                    blurb={theory.blurb}
                    spoiler={theory.spoiler}
                    creator={theory.creator}
                    likes={theory.likes}
                    comments={theory.comments}
                    views={theory.views}
                    uploadDate={theory.uploadDate}
                    isPremium={theory.isPremium}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {theories.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-8xl mb-6 opacity-50">🔍</div>
                <h3 className="text-2xl font-bold text-grey mb-4">No theories found</h3>
                <p className="text-grey text-lg mb-8">
                  Try adjusting your filters or check back later for new content!
                </p>
                <Link href="/account/creator">
                  <button className="bg-purple hover:bg-dark-purple text-white px-8 py-3 rounded-lg transition-colors">
                    Create Your Own Theory
                  </button>
                </Link>
              </motion.div>
            )}

            {/* Load More Button */}
            {theories.length > 0 && (
              <motion.div 
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button className="bg-gradient-to-r from-purple to-dark-purple text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple/25 transition-all">
                  Load More Theories
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Create Theory CTA */}
        <motion.div 
          className="bg-gradient-to-r from-purple/20 to-dark-purple/20 p-8 rounded-lg border border-purple/30 mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-purple">Have Your Own Theory?</h3>
          <p className="text-grey mb-6 max-w-2xl mx-auto">
            Join our community of theorists and share your insights about your favorite anime. 
            Use AI assistance to enhance your theories and reach more fans.
          </p>
          <Link href="/account/creator">
            <button className="bg-purple hover:bg-dark-purple text-white px-8 py-3 rounded-lg transition-colors">
              Start Writing Your Theory
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
