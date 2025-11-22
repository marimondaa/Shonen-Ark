import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { AniListAPI, mockAnimeData } from '../src/lib/services/anilist';
import Image from 'next/image';

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [animeData, setAnimeData] = useState({
    upcoming: [],
    airing: [],
    top: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('time'); // 'time' | 'title'

  useEffect(() => {
    const loadAnimeData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setUsingFallback(false);

        // Try to fetch from AniList API
        const [upcomingData, airingData, topData] = await Promise.all([
          AniListAPI.getUpcomingAnime(1, 100),
          AniListAPI.getCurrentlyAiring(1, 100),
          AniListAPI.getTopAnime(1, 100)
        ]);

        // Check if any API calls failed
        if (!upcomingData || !airingData || !topData) {
          throw new Error('Failed to fetch from AniList API');
        }

        setAnimeData({
          upcoming: upcomingData || [],
          airing: airingData || [],
          top: topData || []
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

  const getCurrentData = useCallback(() => {
    return animeData[activeTab] || [];
  }, [animeData, activeTab]);

  // Compute filtered + sorted list for the active tab
  const visibleData = useMemo(() => {
    const list = getCurrentData();
    const q = searchQuery.trim().toLowerCase();

    const filtered = q
      ? list.filter((anime) => {
        const t = typeof anime.title === 'string'
          ? anime.title
          : (anime.title?.english || anime.title?.romaji || anime.title?.native || '');
        return t.toLowerCase().includes(q);
      })
      : list;

    const getWhen = (a) => {
      // upcoming uses a.airingAt (ISO string), airing uses a.nextAiringAt (ISO string), top10 has none
      const s = a.airingAt || a.nextAiringAt || null;
      return s ? Date.parse(s) : 0;
    };

    const getTitle = (a) =>
      typeof a.title === 'string'
        ? a.title
        : (a.title?.english || a.title?.romaji || a.title?.native || '');

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'title') return getTitle(a).localeCompare(getTitle(b));
      return getWhen(a) - getWhen(b);
    });

    return sorted;
  }, [searchQuery, sortBy, getCurrentData]);

  const aniListUrl = (anime) => {
    // Prefer direct siteUrl when present (top10 data), fallback to id path
    if (anime?.siteUrl) return anime.siteUrl;
    const id = anime?.id || anime?.anilistId || anime?.idAniList;
    return id ? `https://anilist.co/anime/${id}` : 'https://anilist.co/';
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', icon: '🔮', desc: 'New releases coming soon' },
    { id: 'airing', label: 'Currently Airing', icon: '📺', desc: 'Series airing now' },
    { id: 'top', label: 'Top 100', icon: '🏆', desc: 'Highest rated TV series' },
  ];

  return (
    <>
      <Head>
        <title>Anime Calendar - Shonen Ark</title>
        <meta name="description" content="Track upcoming anime releases, currently airing series, and top 10 anime." />
      </Head>

      <div className="min-h-screen bg-void-black text-ash-white transition-colors relative overflow-hidden">
        {/* Soft Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-purple/40 via-void-black to-void-black pointer-events-none" />

        {/* Hero Section */}
        <motion.div
          className="relative py-20 text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-electric-purple to-neon-violet drop-shadow-lg">
              ANIME CALENDAR
            </h1>
            <p className="text-xl text-steel-gray max-w-2xl mx-auto font-body tracking-wide">
              Track releases. Discover new series. Stay updated.
            </p>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
          {/* Tab Navigation - Rounded & Soft */}
          <motion.div
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-shadow-dark/50 backdrop-blur-md p-2 rounded-full border border-white/5 shadow-xl inline-flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2 font-heading font-bold tracking-wide ${activeTab === tab.id
                    ? 'bg-electric-purple text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                    : 'text-steel-gray hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Filters bar */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-shadow-dark/30 p-4 rounded-2xl border border-white/5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex-1 max-w-md relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-steel-gray">🔍</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-white/10 bg-void-black/50 text-white placeholder-steel-gray focus:outline-none focus:border-electric-purple focus:ring-1 focus:ring-electric-purple transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sortBy" className="text-sm text-steel-gray font-medium">Sort by</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-white/10 bg-void-black/50 text-white focus:outline-none focus:border-electric-purple transition-all cursor-pointer"
              >
                <option value="time">Air Time</option>
                <option value="title">Title</option>
              </select>
            </div>
          </motion.div>

          {/* Anime Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-32">
                <div className="w-16 h-16 border-4 border-electric-purple border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-white mb-2">Connection Error</h3>
                <p className="text-steel-gray mb-6">Could not load anime data.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-electric-purple hover:bg-neon-violet text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-electric-purple/25"
                >
                  Retry
                </button>
              </div>
            ) : visibleData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleData.map((anime, index) => {
                  const title = typeof anime.title === 'string'
                    ? anime.title
                    : anime.title?.english || anime.title?.romaji || anime.title?.native || 'Unknown Title';

                  return (
                    <a
                      key={anime.id || index}
                      href={aniListUrl(anime)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-shadow-dark rounded-2xl overflow-hidden border border-white/5 hover:border-electric-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1 h-full flex flex-col"
                      >
                        <div className="aspect-[3/4] relative overflow-hidden">
                          <Image
                            src={anime.coverImage?.large || anime.coverImage || '/api/placeholder/300/400'}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                          {anime.averageScore && (
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-neon-violet px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                              {anime.averageScore}%
                            </div>
                          )}

                          {(anime.airingAt || anime.nextAiringAt || anime.startDate) && (
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="bg-electric-purple/90 backdrop-blur-md text-white text-center py-2 rounded-xl text-xs font-bold shadow-lg">
                                {anime.airingAt || anime.nextAiringAt
                                  ? new Date(anime.airingAt || anime.nextAiringAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                                  : (anime.startDate?.year ? `${anime.startDate.year}` : 'TBA')}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-heading font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-electric-purple transition-colors">
                            {title}
                          </h3>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {anime.genres?.slice(0, 3).map((genre, i) => (
                              <span key={i} className="text-[10px] uppercase tracking-wider font-bold bg-white/5 text-steel-gray px-2 py-1 rounded-md border border-white/5">
                                {genre}
                              </span>
                            ))}
                          </div>

                          <div className="mt-auto flex items-center justify-between text-xs text-steel-gray border-t border-white/5 pt-3">
                            <div className="flex items-center gap-1">
                              <span>📺</span>
                              <span>{anime.format || 'TV'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>🎬</span>
                              <span>{anime.episodes || '?'} eps</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-white mb-2">No Anime Found</h3>
                <p className="text-steel-gray">Try adjusting your search or filters.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
