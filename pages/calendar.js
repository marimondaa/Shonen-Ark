import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState('anime');
  const [animeData, setAnimeData] = useState([]);
  const [mangaData, setMangaData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCalendarData = async () => {
      try {
        // Simulate API call with fallback data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAnimeData([
          {
            id: 1,
            title: "Attack on Titan: Final Season",
            nextEpisode: "Episode 12",
            airDate: "2025-07-20",
            time: "16:00 JST",
            status: "Currently Airing",
            score: 9.0,
            coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx139827.jpg"
          },
          {
            id: 2,
            title: "Demon Slayer: Infinity Castle Arc",
            nextEpisode: "Episode 8",
            airDate: "2025-07-22",
            time: "23:15 JST",
            status: "Currently Airing",
            score: 8.8,
            coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922.jpg"
          },
          {
            id: 3,
            title: "One Piece",
            nextEpisode: "Episode 1089",
            airDate: "2025-07-21",
            time: "09:30 JST",
            status: "Currently Airing",
            score: 9.2,
            coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21.jpg"
          }
        ]);

        setMangaData([
          {
            id: 1,
            title: "One Piece",
            nextChapter: "Chapter 1095",
            releaseDate: "2025-07-19",
            status: "Publishing",
            score: 9.3,
            coverImage: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013.jpg"
          },
          {
            id: 2,
            title: "Chainsaw Man",
            nextChapter: "Chapter 145",
            releaseDate: "2025-07-23",
            status: "Publishing",
            score: 8.9,
            coverImage: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105778.jpg"
          },
          {
            id: 3,
            title: "Jujutsu Kaisen",
            nextChapter: "Chapter 238",
            releaseDate: "2025-07-25",
            status: "Publishing",
            score: 8.7,
            coverImage: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx101517.jpg"
          }
        ]);
      } catch (error) {
        console.error('Failed to load calendar data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalendarData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeUntilRelease = (dateString) => {
    const releaseDate = new Date(dateString);
    const now = new Date();
    const timeDiff = releaseDate.getTime() - now.getTime();
    const daysUntil = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysUntil < 0) return 'Released';
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    return `${daysUntil} days`;
  };

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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Head>
        <title>Release Calendar - Shonen Ark</title>
        <meta name="description" content="Stay updated with the latest anime and manga release dates." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <motion.header 
          className="bg-gradient-to-r from-dark-purple/80 to-purple/80 py-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-6xl mb-4">📅</div>
                <h1 className="text-4xl font-bold mystical-title mb-4 glow-text">
                  Release Calendar
                </h1>
                <p className="text-xl text-grey brush-font">
                  Never miss your favorite anime episodes and manga chapters
                </p>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-dark-purple/30 rounded-lg p-1 border border-purple/20">
              <button
                onClick={() => setActiveTab('anime')}
                className={`px-8 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'anime'
                    ? 'bg-purple text-white'
                    : 'text-grey hover:text-purple'
                }`}
              >
                📺 Anime
              </button>
              <button
                onClick={() => setActiveTab('manga')}
                className={`px-8 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'manga'
                    ? 'bg-purple text-white'
                    : 'text-grey hover:text-purple'
                }`}
              >
                📖 Manga
              </button>
            </div>
          </motion.div>

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
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(activeTab === 'anime' ? animeData : mangaData).map((item) => (
                <motion.article
                  key={item.id}
                  variants={itemVariants}
                  className="bg-dark-purple/30 rounded-lg overflow-hidden border border-purple/20 hover:border-purple/50 transition-all shrine-glow"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  {/* Cover Image */}
                  <div className="relative h-48 bg-dark-purple/50">
                    {item.coverImage && (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="absolute top-2 right-2 bg-purple/80 text-white text-sm px-2 py-1 rounded">
                      ⭐ {item.score}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
                      {getTimeUntilRelease(activeTab === 'anime' ? item.airDate : item.releaseDate)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-purple mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-grey">
                          {activeTab === 'anime' ? 'Next Episode:' : 'Next Chapter:'}
                        </span>
                        <span className="text-white font-medium">
                          {activeTab === 'anime' ? item.nextEpisode : item.nextChapter}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-grey">
                          {activeTab === 'anime' ? 'Air Date:' : 'Release Date:'}
                        </span>
                        <span className="text-purple font-medium">
                          {formatDate(activeTab === 'anime' ? item.airDate : item.releaseDate)}
                        </span>
                      </div>
                      
                      {activeTab === 'anime' && item.time && (
                        <div className="flex justify-between items-center">
                          <span className="text-grey">Time:</span>
                          <span className="text-white">{item.time}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-grey">Status:</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          item.status === 'Currently Airing' || item.status === 'Publishing'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-grey/20 text-grey'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && (activeTab === 'anime' ? animeData : mangaData).length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">📅</div>
              <p className="text-grey text-lg">No {activeTab} releases scheduled at the moment.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
