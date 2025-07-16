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
    movies: []
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
        const [upcomingData, airingData, moviesData] = await Promise.all([
          AniListAPI.getUpcomingAnime(1, 15),
          AniListAPI.getCurrentlyAiring(1, 15),
          AniListAPI.getAnimeMovies(1, 15)
        ]);

        // Check if any API calls failed
        if (!upcomingData || !airingData || !moviesData) {
          throw new Error('Failed to fetch from AniList API');
        }

        setAnimeData({
          upcoming: upcomingData || [],
          airing: airingData || [],
          movies: moviesData || []
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
    { id: 'upcoming', label: 'Upcoming', icon: '🔮' },
    { id: 'airing', label: 'Currently Airing', icon: '📺' },
    { id: 'movies', label: 'Movies', icon: '🎬' }
  ];

  return (
    <ErrorBoundary>
      <Head>
        <title>Anime Calendar - Shonen Ark</title>
        <meta name="description" content="Track upcoming anime releases, currently airing series, and movie premieres." />
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
                Track upcoming releases, currently airing series, and movie premieres
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
            <div className="bg-dark-purple/20 p-1 rounded-lg border border-purple/30">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-lg transition-all flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? 'bg-purple text-white shadow-lg'
                      : 'text-purple hover:bg-purple/20'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
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
                <p className="ml-4 text-purple font-mystical">Loading anime data...</p>
              </div>
            ) : getCurrentData().length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getCurrentData().map((anime, index) => (
                  <AnimeCalendarCard key={anime.id} anime={anime} index={index} />
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4 opacity-50">📺</div>
                <h3 className="text-xl font-bold text-grey mb-2 mystical-title">No anime found</h3>
                <p className="text-grey font-mystical">Check back later for updates!</p>
              </motion.div>
            )}
          </motion.div>

          {/* Refresh button */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple to-dark-purple text-white px-6 py-3 rounded-lg font-mystical hover:shadow-lg hover:shadow-purple/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Refresh Data
            </motion.button>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CalendarPage;
