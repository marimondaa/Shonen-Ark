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

  const handleLike = async (e) => {
    e.preventDefault(); // Prevent navigation if clicking like button
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

      if (!res.ok) throw new Error('Failed to like');

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
    <Link href={`/theories/${theory.id}`} className="block h-full">
      <motion.article
        className="h-full bg-shadow-dark rounded-xl overflow-hidden border border-white/5 hover:border-electric-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:-translate-y-1 flex flex-col group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header / Meta */}
        <div className="p-6 pb-4 border-b border-white/5 bg-void-black/30">
          <div className="flex justify-between items-start gap-4 mb-3">
            <div className="flex flex-wrap gap-2">
              {theory.category && (
                <span className="text-[10px] uppercase tracking-wider font-bold bg-electric-purple/10 text-electric-purple px-2 py-1 rounded border border-electric-purple/20">
                  {theory.category}
                </span>
              )}
              {theory.source && (
                <span className="text-[10px] uppercase tracking-wider font-bold bg-white/5 text-steel-gray px-2 py-1 rounded border border-white/10">
                  Source: {theory.source}
                </span>
              )}
            </div>
            <span className="text-xs text-steel-gray font-mono">
              {theory.created_at ? new Date(theory.created_at).toLocaleDateString() : 'Just now'}
            </span>
          </div>

          <h3 className="text-xl font-heading font-bold text-white group-hover:text-electric-purple transition-colors line-clamp-2 leading-tight">
            {theory.title}
          </h3>
        </div>

        {/* Body / Summary */}
        <div className="p-6 flex-1 flex flex-col">
          <p className="text-steel-gray text-sm leading-relaxed line-clamp-4 mb-6 font-body">
            {theory.excerpt || theory.description || theory.content?.substring(0, 150) + '...'}
          </p>

          {/* Footer / Actions */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs text-steel-gray">
                <div className="w-6 h-6 rounded-full bg-electric-purple/20 flex items-center justify-center text-[10px] text-electric-purple font-bold border border-electric-purple/30">
                  {(theory.creator?.name || theory.author || 'A').charAt(0).toUpperCase()}
                </div>
                <span>{theory.creator?.name || theory.author || 'Anonymous'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${isLiked ? 'text-electric-purple' : 'text-steel-gray hover:text-white'
                  }`}
              >
                <span>{isLiked ? '★' : '☆'}</span>
                <span>{likes}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs font-bold text-steel-gray">
                <span>💬</span>
                <span>{theory.comments?.count || theory.comments || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default TheoryCard;
