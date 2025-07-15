import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TheoryCard from '../components/TheoryCard';

export default function TheoriesPage() {
  const [theories, setTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadTheories = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setTheories([
          {
            id: 1,
            title: "The True Power of Luffy's Gear 5",
            excerpt: "An analysis of how Gear 5 might connect to ancient powers and the will of D. This theory explores the mystical connection between Joy Boy and modern pirates.",
            author: "Theory Master",
            likes: 150,
            category: "One Piece",
            date: "2 days ago",
            comments: 23
          },
          {
            id: 2,
            title: "Hidden Connections in Attack on Titan",
            excerpt: "Exploring the deeper meanings behind the titans and their connection to memories, exploring how the Attack Titan's ability to see future memories creates paradoxes.",
            author: "AoT Theorist",
            likes: 203,
            category: "Attack on Titan", 
            date: "1 week ago",
            comments: 45
          },
          {
            id: 3,
            title: "Demon Slayer: The Real Purpose of Breathing Techniques",
            excerpt: "Why breathing techniques might be more than just combat moves. An exploration of how they connect to spiritual enlightenment and ancient traditions.",
            author: "Hashira Theory",
            likes: 89,
            category: "Demon Slayer",
            date: "3 days ago",
            comments: 12
          },
          {
            id: 4,
            title: "Jujutsu Kaisen: The True Nature of Cursed Energy",
            excerpt: "A deep dive into how cursed energy reflects human emotions and the philosophical implications of turning negative emotions into power.",
            author: "Curse Specialist",
            likes: 176,
            category: "Jujutsu Kaisen",
            date: "5 days ago",
            comments: 34
          },
          {
            id: 5,
            title: "My Hero Academia: The Quirk Singularity Theory",
            excerpt: "Exploring how quirks are evolving beyond human control and what this means for future generations of heroes and society.",
            author: "Quirk Analyst",
            likes: 124,
            category: "My Hero Academia",
            date: "1 week ago",
            comments: 28
          }
        ]);
      } catch (error) {
        console.error('Failed to load theories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheories();
  }, []);

  const categories = ['all', 'One Piece', 'Attack on Titan', 'Demon Slayer', 'Jujutsu Kaisen', 'My Hero Academia'];

  const filteredTheories = theories.filter(theory => 
    filter === 'all' || theory.category === filter
  ).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'popular') return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mystical-title mb-4 text-purple glow-text">
            Anime Theories
          </h1>
          <p className="text-xl text-text-muted brush-font max-w-2xl mx-auto">
            Explore fan theories and deep analysis from our mystical community. 
            Dive into the hidden secrets of your favorite anime.
          </p>
        </motion.header>

        {/* Filter and Sort Controls */}
        <motion.div 
          className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2">
            <span className="text-text-muted font-semibold mr-2">Filter by:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filter === category
                    ? 'bg-purple text-white'
                    : 'bg-bg-dark-secondary text-text-muted hover:bg-purple/20 hover:text-purple'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-text-muted font-semibold">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-bg-dark-secondary text-text-light border border-purple/30 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </motion.div>

        {/* Create Theory Button */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/theories/create"
            className="bg-purple hover:bg-dark-purple text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-bg-dark shrine-glow"
          >
            ✨ Share Your Theory
          </Link>
        </motion.div>

        {/* Theories Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <motion.div 
              className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredTheories.map((theory, index) => (
              <motion.div
                key={theory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <TheoryCard theory={theory} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredTheories.length === 0 && !isLoading && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-text-muted text-lg">No theories found for the selected filter.</p>
            <Link
              href="/theories/create"
              className="text-purple hover:text-dark-purple underline mt-2 inline-block"
            >
              Be the first to share a theory in this category!
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
