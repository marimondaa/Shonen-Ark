import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { AniListAPI, mockAnimeData } from '../lib/anilist';
import AnimeCalendarCard from '../components/AnimeCalendarCard';
import ErrorBoundary from '../components/ErrorBoundary';

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [animeData, setAnimeData] = useState({
    upcoming: [],
    airing: [],
    top10: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadAnimeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setUsingFallback(false);

        // Try to fetch from AniList API
        const [upcomingData, airingData, top10Data] = await Promise.all([
          AniListAPI.getUpcomingAnime(1, 15),
          AniListAPI.getCurrentlyAiring(1, 15),
          AniListAPI.getTop10Anime(1, 10)
        ]);

        // Check if any API calls failed
        if (!upcomingData || !airingData || !top10Data) {
          throw new Error('Failed to fetch from AniList API');
        }

        setAnimeData({
          upcoming: upcomingData || [],
          airing: airingData || [],
          top10: top10Data || []
        });

        console.log('✅ Successfully loaded data from AniList API');

      } catch (error) {
        console.warn('⚠️ AniList API failed, using fallback data:', error.message);
        
        // Use mock data as fallback
        setAnimeData(mockAnimeData);
        setUsingFallback(true);
        setError('Using offline data - some information may be outdated');
      } finally {
        setIsLoading(false);
      }
    };

    loadAnimeData();
  }, []);

  const getCurrentData = () => {
    return animeData[activeTab] || [];
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: '🔮', desc: 'New releases coming soon' },
    { id: 'airing', label: 'Currently Airing', icon: '📺', desc: 'Series airing now' },
    { id: 'top10', label: 'Top 10', icon: '🏆', desc: 'Highest rated anime' }
  ];

  return (
    <ErrorBoundary>
      <Head>
        <title>Anime Calendar - Shonen Ark</title>
        <meta name="description" content="Track upcoming anime releases, currently airing series, and top 10 anime." />
      </Head>

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
              <div className="text-8xl mb-6">📅</div>
              <h1 className="text-5xl font-bold mystical-title mb-4 glow-text">
                Anime Calendar
              </h1>
              <p className="text-xl text-purple-200 brush-font max-w-2xl mx-auto">
                Track upcoming releases, currently airing series, and top 10 anime
              </p>

              {/* Status indicator */}
              {usingFallback && (
                <motion.div 
                  className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-3 max-w-md mx-auto mt-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-orange-200 text-sm font-mystical">
                    ⚠️ Using offline data - Live updates temporarily unavailable
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-black/95 backdrop-blur-sm p-2 rounded-xl border border-accent-pink/20 shadow-2xl">
              <div className="flex flex-wrap justify-center gap-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative px-6 py-4 rounded-lg transition-all duration-300 flex flex-col items-center space-y-1 min-w-[140px] ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple to-accent-pink text-white shadow-lg shrine-glow'
                        : 'text-text-light hover:bg-purple/20 hover:text-accent-pink border border-purple/30'
                    }`}
                  >
                    <motion.span 
                      className="text-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {tab.icon}
                    </motion.span>
                    <div className="text-center">
                      <div className="font-medium text-sm">
                        {tab.label}
                      </div>
                      <div className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                        {tab.desc}
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-white rounded-full"
                        layoutId="tab-indicator"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Anime Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <motion.div 
                  className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
                <p className="text-gray-400 mb-6">
                  We're having trouble loading the anime calendar. Please try refreshing the page.
                </p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-purple hover:bg-purple/80 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  🔄 Refresh Page
                </button>
              </div>
            ) : getCurrentData().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getCurrentData().map((anime, index) => {
                  // Handle different data structures for different tabs
                  const title = typeof anime.title === 'string' 
                    ? anime.title 
                    : anime.title?.english || anime.title?.romaji || anime.title?.native || 'Unknown Title';
                  
                  return (
                    <motion.div
                      key={anime.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-dark-purple/30 backdrop-blur-sm rounded-lg overflow-hidden border border-purple/20 shrine-glow hover:border-accent-pink/50 transition-all duration-300"
                    >
                      <div className="aspect-[3/4] relative">
                        <img 
                          src={anime.coverImage?.large || anime.coverImage || '/api/placeholder/300/400'} 
                          alt={title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {anime.averageScore && (
                          <div className="absolute top-2 right-2 bg-black/80 text-accent-pink px-2 py-1 rounded text-sm font-bold">
                            ⭐ {anime.averageScore}/100
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white mb-2 line-clamp-2">
                          {title}
                        </h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {anime.genres?.slice(0, 2).map((genre, i) => (
                            <span key={i} className="text-xs bg-purple/30 text-purple-200 px-2 py-1 rounded">
                              {genre}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-400">
                          {anime.format} • {anime.episodes ? `${anime.episodes} episodes` : 'Ongoing'}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold mb-2">No data available</h3>
                <p className="text-gray-400">
                  No anime found for the {activeTab} section.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CalendarPage;
