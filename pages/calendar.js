import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { AniListAPI, mockAnimeData } from '../lib/anilist';

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

        const [upcomingData, airingData, top10Data] = await Promise.all([
          AniListAPI.getUpcomingAnime(1, 15),
          AniListAPI.getCurrentlyAiring(1, 15),
          AniListAPI.getTop10Anime(1, 10)
        ]);

        if (!upcomingData || !airingData || !top10Data) {
          throw new Error('Failed to fetch from AniList API');
        }

        setAnimeData({
          upcoming: upcomingData || [],
          airing: airingData || [],
          top10: top10Data || []
        });

        console.log('Successfully loaded data from AniList API');

      } catch (error) {
        console.warn('AniList API failed, using fallback data:', error.message);
        
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
    { id: 'upcoming', label: 'Upcoming', icon: '', desc: 'New releases coming soon' },
    { id: 'airing', label: 'Currently Airing', icon: '', desc: 'Series airing now' },
    { id: 'top10', label: 'Top 10', icon: '', desc: 'Highest rated anime' }
  ];

  return (
    <>
      <Head>
        <title>Anime Calendar - Shonen Ark</title>
        <meta name="description" content="Track upcoming anime releases, currently airing series, and top 10 anime." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Anime Calendar</h1>
            <p className="text-gray-400">Track upcoming releases, currently airing series, and top 10 anime</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-4 py-2 rounded bg-purple-600 text-white"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="text-xl">Loading...</div>
            </div>
          ) : getCurrentData().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getCurrentData().map((anime, index) => {
                const title = typeof anime.title === 'string' 
                  ? anime.title 
                  : anime.title?.english || anime.title?.romaji || anime.title?.native || 'Unknown Title';
                
                return (
                  <div
                    key={anime.id || index}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="aspect-[3/4] relative">
                      <img 
                        src={anime.coverImage?.large || anime.coverImage || '/api/placeholder/300/400'} 
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white mb-2">{title}</h3>
                      <div className="text-sm text-gray-400">
                        {anime.format}  {anime.episodes ? `${anime.episodes} episodes` : 'Ongoing'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-xl">No data available</div>
              <p className="text-gray-400">No anime found for the {activeTab} section.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
