import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const TheoryCard = ({ theory }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [likes, setLikes] = useState(theory.likes?.count || theory.likes || 0);
  const [isLiked, setIsLiked] = useState(false); // In a real app, we'd check if the user liked it from the API response
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (isLiking) return;
    setIsLiking(true);

    // Optimistic update
    const previousLikes = likes;
    const previousIsLiked = isLiked;

    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);

    try {
      const res = await fetch(`/api/theories/${theory.id}/like`, {
        method: 'POST',
      });

      if (!res.ok) {
        throw new Error('Failed to like');
      }

      // Optional: sync with server response if needed
      // const data = await res.json();
      // setIsLiked(data.liked);
    } catch (error) {
      console.error('Error liking theory:', error);
      // Revert optimistic update
      setLikes(previousLikes);
      setIsLiked(previousIsLiked);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.article
      className="manga-card backdrop-blur-sm rounded-lg p-6 border border-purple/30 transition-all duration-300"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <header className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-purple line-clamp-2 font-manga-header uppercase tracking-wide">
          {theory.title}
        </h3>
        {theory.category && (
          <span className="text-xs text-paper-beige bg-purple/20 px-2 py-1 rounded border border-purple/30 font-manga-body">
            {theory.category}
          </span>
        )}
      </header>

      <p className="text-paper-beige/80 mb-4 line-clamp-3 font-manga-body">
        {theory.excerpt || theory.description || theory.content?.substring(0, 100) + '...'}
      </p>

      <div className="flex items-center justify-between text-sm text-text-muted mb-4">
        <span>By {theory.creator?.name || theory.author || 'Unknown'}</span>
        <span>{theory.created_at ? new Date(theory.created_at).toLocaleDateString() : 'Recently'}</span>
      </div>

      <footer className="flex justify-between items-center">
        <div className="flex space-x-4">
          <motion.button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-1 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded p-1 ${isLiked ? 'text-accent-pink' : 'text-text-muted hover:text-accent-pink'
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
            <span>{theory.comments?.count || theory.comments || 0}</span>
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
