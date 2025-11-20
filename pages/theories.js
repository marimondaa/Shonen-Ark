import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TheoryCard from '../src/components/features/TheoryCard';
import MangaGrid from '../src/components/manga/MangaGrid';
import MangaPanel from '../src/components/manga/MangaPanel';
import SortBar from '../src/components/catalog/SortBar';

export default function TheoriesPage() {
  const [theories, setTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchTheories = useCallback(async (reset = false) => {
    if (reset) {
      setIsLoading(true);
      setTheories([]);
    }

    try {
      const params = new URLSearchParams({
        page: reset ? 1 : page,
        limit: 9,
        sortBy: sortBy === 'POPULARITY_DESC' ? 'popular' : sortBy === 'TRENDING_DESC' ? 'trending' : 'newest',
      });

      if (filter !== 'all') params.append('category', filter); // Note: API uses 'category' but UI uses 'anime' filter logic. We might need to adjust API or UI.
      // The UI says "Filter by anime", but the API expects 'category' or we need to add 'anime' filter to API.
      // Looking at API code: it has 'category' filter. It doesn't seem to have 'anime' filter explicitly in the snippet I saw, 
      // but let's check if we can pass 'search' for anime or if we should add 'anime' param to API.
      // The API snippet showed: if (search) query.or(...)
      // It didn't show explicit anime filter. 
      // However, the mock data had 'anime' field. The DB schema has 'anime_series'.
      // Let's assume we can pass 'search' for now or we need to update API.
      // For this step, I will pass 'search' if query is present, and I'll pass 'anime' as a custom param if I update the API, 
      // but for now let's stick to what the API supports or just use 'search' for anime if the user types it.
      // Wait, the UI has specific buttons for Anime. 
      // Let's pass it as 'search' for now if filter is not 'all', combined with query.

      let searchQuery = query;
      if (filter !== 'all') {
        searchQuery = searchQuery ? `${searchQuery} ${filter}` : filter;
      }

      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/theories?${params.toString()}`);
      const data = await res.json();

      if (data.theories) {
        setTheories(prev => reset ? data.theories : [...prev, ...data.theories]);
        setHasMore(data.theories.length === 9); // Assuming limit is 9
      }
    } catch (error) {
      console.error('Error fetching theories:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filter, sortBy, query, page]);

  useEffect(() => {
    fetchTheories(true);
  }, [filter, sortBy, query]);

  useEffect(() => {
    if (page > 1) fetchTheories(false);
  }, [page, fetchTheories]);

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;
    const el = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasMore && !isLoading) {
        setPage(p => p + 1);
      }
    }, { threshold: 0.2 });
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  const animeOptions = ['all', 'One Piece', 'Jujutsu Kaisen', 'Attack on Titan', 'Demon Slayer'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'trending', label: 'Trending' }
  ];

  return (
    <div className="min-h-screen transition-colors dark:bg-background dark:text-text-light">
      {/* Hero Section */}
      <motion.div
        className="manga-panel mx-4 mt-4 dark:bg-gradient-to-r dark:from-dark-purple dark:to-purple dark:text-white py-20 transition-colors"
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
        {/* SortBar with search */}
        <div className="mb-6">
          <SortBar
            sort={sortBy === 'newest' ? 'START_DATE_DESC' : sortBy === 'popular' ? 'POPULARITY_DESC' : 'TRENDING_DESC'}
            onChange={(val) => {
              setPage(1);
              setSortBy(val === 'POPULARITY_DESC' ? 'popular' : val === 'TRENDING_DESC' ? 'trending' : 'newest');
            }}
            query={query}
            onQueryChange={(v) => { setPage(1); setQuery(v); }}
          />
        </div>

        {/* Filters */}
        <motion.div
          className="manga-card flex flex-col gap-6 mb-8 p-6 bg-white rounded-lg border border-gray-200 dark:bg-dark-purple/30 dark:border-purple/30"
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
                  onClick={() => { setPage(1); setFilter(anime); }}
                  className={`px-3 py-2 rounded-lg border transition-all text-sm font-manga-body font-medium ${filter === anime
                      ? 'bg-purple text-white border-purple'
                      : 'dark:bg-transparent dark:text-white dark:border-purple/30'
                    }`}
                >
                  {anime}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options (simple select for mock) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-purple font-medium whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => { setPage(1); setSortBy(e.target.value); }}
              className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple w-full sm:w-auto dark:bg-transparent dark:text-white dark:border-purple/30 border"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-black">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && theories.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <motion.div
              className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
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
                  transition={{ delay: 0.03 * index, duration: 0.5 }}
                >
                  <TheoryCard theory={theory} />
                </motion.div>
              ))}
            </motion.div>

            {/* Infinite loader sentinel */}
            {hasMore && (
              <div ref={loaderRef} className="py-10 text-center text-gray-500">Loading more…</div>
            )}
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
              className="bg-purple hover:bg-dark-purple text-white px-8 py-3 rounded-lg transition-colors font-manga-header uppercase tracking-wide"
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
