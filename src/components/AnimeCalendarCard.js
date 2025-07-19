import { motion } from 'framer-motion';
import { useState } from 'react';

const AnimeCalendarCard = ({ anime, index }) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Released';
    if (diffDays === 0) return 'Today!';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const getTimeUntil = (dateString) => {
    const now = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - now;
    
    if (diffTime <= 0) return 'Live now!';
    
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').substring(0, 120) + '...';
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-dark-purple/30 to-black/50 rounded-lg overflow-hidden border border-purple/20 hover:border-purple/40 transition-all duration-300 shrine-glow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className="aspect-[3/4] bg-gradient-to-br from-purple/20 to-dark-purple/20 relative">
        {anime.coverImage && !imageError ? (
          <img 
            src={anime.coverImage} 
            alt={anime.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-50">
              {anime.format === 'MOVIE' ? '🎬' : '📺'}
            </span>
          </div>
        )}
        
        {/* Format badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-purple/80 text-white px-2 py-1 rounded text-xs font-mystical">
            {anime.format}
          </span>
        </div>

        {/* Time until badge */}
        {(anime.airingAt || anime.nextAiringAt) && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-green-600/80 text-white px-2 py-1 rounded text-xs font-mystical">
              {getTimeUntil(anime.airingAt || anime.nextAiringAt)}
            </span>
          </div>
        )}

        {/* Episode number for airing shows */}
        {anime.nextEpisode && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600/80 text-white px-2 py-1 rounded text-xs font-mystical">
              Ep {anime.nextEpisode}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 mystical-title line-clamp-2">
          {anime.title}
        </h3>
        
        {/* Description */}
        {anime.description && (
          <p className="text-grey text-sm mb-3 leading-relaxed">
            {stripHtml(anime.description)}
          </p>
        )}

        {/* Genres */}
        {anime.genres && anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {anime.genres.slice(0, 3).map((genre, idx) => (
              <span 
                key={idx}
                className="bg-purple/20 text-purple-200 px-2 py-1 rounded text-xs border border-purple/30"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        
        <div className="space-y-2 text-sm">
          {(anime.airingAt || anime.nextAiringAt) && (
            <div className="flex justify-between items-center">
              <span className="text-purple font-mystical">
                {anime.nextEpisode ? 'Next Episode:' : 'Release Date:'}
              </span>
              <span className="text-white text-xs">
                {formatDate(anime.airingAt || anime.nextAiringAt)}
              </span>
            </div>
          )}
          
          {anime.episode && (
            <div className="flex justify-between items-center">
              <span className="text-purple font-mystical">Episode:</span>
              <span className="text-white">{anime.episode}</span>
            </div>
          )}
          
          {anime.episodes && (
            <div className="flex justify-between items-center">
              <span className="text-purple font-mystical">Total Episodes:</span>
              <span className="text-grey">{anime.episodes}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded font-mystical ${
            anime.status === 'NOT_YET_RELEASED' 
              ? 'bg-purple/20 text-purple' 
              : anime.status === 'RELEASING'
              ? 'bg-green-600/20 text-green-400'
              : 'bg-grey/20 text-grey'
          }`}>
            {anime.status === 'NOT_YET_RELEASED' ? 'Upcoming' : 
             anime.status === 'RELEASING' ? 'Airing' : 'Finished'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimeCalendarCard;
