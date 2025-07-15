import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { AniListAPI } from '../lib/anilist';
import { getCalendarData, filterCalendarByType, sortContent } from '../lib/mockData';

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState('anime');
  const [calendarData, setCalendarData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCalendarData = async () => {
      try {
        setIsLoading(true);
        
        let data = [];
        
        // Try to fetch real data from AniList API
        try {
          if (activeTab === 'anime') {
            const animeData = await AniListAPI.getUpcomingReleases('ANIME', 30);
            if (animeData && animeData.length > 0) {
              data = animeData.filter(item => item.releaseDate); // Only items with release dates
            }
          } else if (activeTab === 'manga') {
            const mangaData = await AniListAPI.getUpcomingReleases('MANGA', 30);
            if (mangaData && mangaData.length > 0) {
              data = mangaData.filter(item => item.releaseDate);
            }
          }
        } catch (apiError) {
          console.log('AniList API not available, using mock data');
        }
        
        // Fallback to mock data if API fails
        if (data.length === 0) {
          const mockData = getCalendarData();
          data = filterCalendarByType(mockData, activeTab);
        }
        
        // Sort by release date (soonest first)
        data.sort((a, b) => {
          const dateA = new Date(a.releaseDate);
          const dateB = new Date(b.releaseDate);
          return dateA - dateB;
        });
        
        setCalendarData(data);
        setFilteredData(data);
        
      } catch (error) {
        console.error('Failed to load calendar data:', error);
        // Ultimate fallback
        const mockData = getCalendarData();
        const filtered = filterCalendarByType(mockData, activeTab);
        setCalendarData(filtered);
        setFilteredData(filtered);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalendarData();
  }, [activeTab]);

  const tabs = [
    { id: 'anime', label: 'Anime Episodes', icon: '📺' },
    { id: 'manga', label: 'Manga Chapters', icon: '📚' }
  ];

  return (
    <>
      <Head>
        <title>Release Calendar - Shonen Ark</title>
        <meta name="description" content="Stay updated with the latest anime episodes and manga chapter releases." />
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
                Release Calendar
              </h1>
              <p className="text-xl text-purple-200 brush-font max-w-2xl mx-auto">
                Never miss a release! Track upcoming anime episodes and manga chapters
              </p>
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
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="bg-dark-purple/20 rounded-xl border border-purple/30 overflow-hidden hover:border-purple/50 transition-all group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Cover Image */}
                  <div className="aspect-video bg-gradient-to-br from-purple/20 to-dark-purple/20 flex items-center justify-center">
                    {item.coverImage ? (
                      <img 
                        src={item.coverImage} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl opacity-50">
                        {activeTab === 'anime' ? '📺' : '📚'}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple transition-colors">
                      {item.title}
                    </h3>

                    {/* Next Release Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-purple text-sm">
                          {activeTab === 'anime' ? 'Next Episode:' : 'Next Chapter:'}
                        </span>
                        <span className="text-white text-sm font-medium">
                          {activeTab === 'anime' ? item.nextEpisode : item.nextChapter}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-purple text-sm">Release Date:</span>
                        <span className="text-green-400 text-sm font-medium">
                          {new Date(item.releaseDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-purple text-sm">Status:</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          item.status === 'Airing' || item.status === 'Publishing' 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-grey/20 text-grey'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white font-medium">{item.score}</span>
                      </div>
                      
                      {/* Days Until Release */}
                      <div className="text-xs text-purple">
                        {(() => {
                          const today = new Date();
                          const releaseDate = new Date(item.releaseDate);
                          const diffTime = releaseDate - today;
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                          
                          if (diffDays < 0) return 'Released';
                          if (diffDays === 0) return 'Today!';
                          if (diffDays === 1) return 'Tomorrow';
                          return `${diffDays} days`;
                        })()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && filteredData.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-8xl mb-6 opacity-50">
                {activeTab === 'anime' ? '📺' : '📚'}
              </div>
              <h3 className="text-2xl font-bold text-grey mb-4">No upcoming releases</h3>
              <p className="text-grey text-lg">
                Check back later for new {activeTab === 'anime' ? 'episode' : 'chapter'} updates!
              </p>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div 
            className="bg-gradient-to-r from-purple/20 to-dark-purple/20 p-8 rounded-lg border border-purple/30 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-purple text-center">Stay Updated</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🔔</div>
                <h4 className="font-bold text-white mb-2">Notifications</h4>
                <p className="text-grey text-sm">
                  Get notified when your favorite series release new content
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-bold text-white mb-2">Mobile Friendly</h4>
                <p className="text-grey text-sm">
                  Access the calendar anywhere, anytime on any device
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-bold text-white mb-2">Accurate Data</h4>
                <p className="text-grey text-sm">
                  Real-time updates from official sources and databases
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
