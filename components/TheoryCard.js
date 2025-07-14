import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TheoryCard({ theory }) {
  const [showSpoiler, setShowSpoiler] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(theory.likes || 0)

  const handleLike = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setLiked(!liked)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDate = (date) => {
    if (!date) return 'Recently'
    const now = new Date()
    const posted = new Date(date)
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60))
    
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return posted.toLocaleDateString()
  }

  const getTagColor = (tag) => {
    const colors = {
      'jujutsu-kaisen': 'bg-purple-600',
      'one-piece': 'bg-orange-600',
      'attack-on-titan': 'bg-red-600',
      'demon-slayer': 'bg-green-600',
      'naruto': 'bg-yellow-600',
      'chainsaw-man': 'bg-pink-600',
      'theory': 'bg-indigo-600',
      'analysis': 'bg-teal-600',
      'spoiler': 'bg-red-500'
    }
    return colors[tag] || 'bg-gray-600'
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/theories/${theory.slug || theory.id}`}>
        <div className="cursor-pointer">
          <div className="relative">
            <Image
              src={theory.thumbnail || theory.image || '/images/placeholder-theory.jpg'}
              alt={theory.title}
              width={400}
              height={225}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            
            {/* Spoiler Badge */}
            {theory.hasSpoilers && (
              <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                ⚠️ SPOILER
              </div>
            )}

            {/* Views Counter */}
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
              👁 {formatNumber(theory.views || 0)}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {theory.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className={`${getTagColor(tag)} text-white text-xs px-2 py-1 rounded-full font-medium`}
            >
              #{tag}
            </span>
          ))}
          {theory.tags?.length > 3 && (
            <span className="text-gray-400 text-xs px-2 py-1">
              +{theory.tags.length - 3} more
            </span>
          )}
        </div>
        
        {/* Title */}
        <Link href={`/theories/${theory.slug || theory.id}`}>
          <h3 className="font-bold text-xl mb-3 hover:text-red-400 transition-colors cursor-pointer text-white leading-tight">
            {theory.title}
          </h3>
        </Link>
        
        {/* Content Preview */}
        <div className="mb-4">
          {theory.hasSpoilers && !showSpoiler ? (
            <div className="relative">
              <p className="text-gray-400 blur-sm select-none">
                {theory.blurb}
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowSpoiler(true)
                }}
                className="absolute inset-0 flex items-center justify-center bg-gray-800/90 text-red-400 hover:text-red-300 font-bold rounded-lg border border-red-500/30"
              >
                🔍 Click to reveal spoilers
              </button>
            </div>
          ) : (
            <p className="text-gray-300 leading-relaxed line-clamp-3">
              {theory.blurb}
            </p>
          )}
        </div>
        
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
            {theory.author?.charAt(0).toUpperCase() || '?'}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{theory.author || 'Anonymous'}</p>
            <p className="text-gray-500 text-xs">{formatDate(theory.createdAt)}</p>
          </div>
        </div>

        {/* Engagement Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 ${
                liked 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-red-400 hover:bg-gray-800'
              }`}
            >
              <span>{liked ? '❤️' : '🤍'}</span>
              <span className="text-sm font-medium">{formatNumber(likeCount)}</span>
            </button>

            {/* Comments */}
            <div className="flex items-center gap-1 text-gray-400">
              <span>💬</span>
              <span className="text-sm">{formatNumber(theory.comments || 0)}</span>
            </div>
          </div>

          {/* Share Button */}
          <button className="text-gray-400 hover:text-white transition-colors p-1 rounded">
            <span>🔗</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
