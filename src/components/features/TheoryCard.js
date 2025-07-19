import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TheoryCard = ({ theory }) => {
  const [likes, setLikes] = useState(theory.likes || 0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <motion.article 
      className="bg-anime-blue/30 backdrop-blur-sm rounded-lg p-6 border border-accent-pink/20 shrine-glow transition-all duration-300"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-accent-pink line-clamp-2 mystical-title">
          {theory.title}
        </h3>
        {theory.category && (
          <span className="text-xs text-text-muted bg-bg-dark/50 px-2 py-1 rounded border border-accent-pink/30">
            {theory.category}
          </span>
        )}
      </header>
      
      <p className="text-text-muted mb-4 line-clamp-3 brush-font">
        {theory.excerpt || theory.description}
      </p>
      
      <div className="flex items-center justify-between text-sm text-text-muted mb-4">
        <span>By {theory.author}</span>
        <span>{theory.date || 'Recently'}</span>
      </div>
      
      <footer className="flex justify-between items-center">
        <div className="flex space-x-4">
          <motion.button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded p-1 ${
              isLiked ? 'text-accent-pink' : 'text-text-muted hover:text-accent-pink'
            }`}
            whileTap={{ scale: 0.95 }}
            aria-label={`Like theory: ${theory.title}`}
          >
            <motion.span
              animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {isLiked ? '👍' : '👍'}
            </motion.span>
            <span>{likes}</span>
          </motion.button>
          <span className="flex items-center space-x-1 text-text-muted">
            <span>💬</span>
            <span>{theory.comments || 0}</span>
          </span>
        </div>
        
        <Link
          href={`/theories/${theory.id}`}
          className="bg-accent-pink/20 hover:bg-accent-pink/30 text-accent-pink px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink ink-brush-edge"
        >
          Read More
        </Link>
      </footer>
    </motion.article>
  );
};

export default TheoryCard;
