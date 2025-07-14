import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'
import Navbar from '../../components/Navbar'
import { motion } from 'framer-motion'

export default function DiscoveryCategory() {
  const router = useRouter()
  const { category } = router.query
  const fileInputRef = useRef(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const categoryInfo = {
    'fan-fights': {
      title: 'Fan Fights',
      description: 'Epic battle videos created by fans',
      icon: '⚔️',
      accept: 'video/*',
      placeholder: 'Upload your epic battle videos (MP4, MOV, AVI)'
    },
    'audio-fx': {
      title: 'Audio FX',
      description: 'Custom soundscapes and music',
      icon: '🎵',
      accept: 'audio/*',
      placeholder: 'Upload your audio creations (MP3, WAV, OGG)'
    },
    'character-designs': {
      title: 'Character Designs',
      description: 'Original character art and concepts',
      icon: '🎨',
      accept: 'image/*',
      placeholder: 'Upload your character designs (PNG, JPG, WebP)'
    }
  }

  const currentCategory = categoryInfo[category] || categoryInfo['fan-fights']

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    // TODO: Implement actual upload to Cloudinary
    setTimeout(() => {
      setUploadProgress(100)
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
        alert('Upload completed! (This is a demo)')
      }, 500)
    }, 2000)
  }

  // Sample content data
  const sampleContent = [
    {
      id: 1,
      title: 'Goku vs Vegeta Epic Battle',
      creator: 'AnimeFan99',
      thumbnail: '/placeholder-content.jpg',
      likes: 234,
      comments: 45,
      views: 1200,
      type: 'video'
    },
    {
      id: 2,
      title: 'Naruto Emotional OST Remix',
      creator: 'SoundMaster',
      thumbnail: '/placeholder-audio.jpg',
      likes: 156,
      comments: 23,
      views: 890,
      type: 'audio'
    },
    {
      id: 3,
      title: 'Custom Luffy Design',
      creator: 'ArtistPro',
      thumbnail: '/placeholder-art.jpg',
      likes: 312,
      comments: 67,
      views: 2100,
      type: 'image'
    }
  ]

  return (
    <>
      <Head>
        <title>{currentCategory.title} - Discovery - Shonen Ark</title>
        <meta name="description" content={currentCategory.description} />
      </Head>
      
      <div className="bg-gray-950 text-white min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentCategory.icon}</div>
            <h1 className="text-4xl font-bold mb-2">{currentCategory.title}</h1>
            <p className="text-gray-400 text-lg">{currentCategory.description}</p>
          </div>

          {/* Upload Section */}
          <div className="bg-gray-900 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Upload Your Content</h2>
            <div 
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <div>
                  <div className="mb-2">Uploading... {uploadProgress}%</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-gray-400">{currentCategory.placeholder}</p>
                  <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-4 transition-colors">
                    Choose File
                  </button>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={currentCategory.accept}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 mb-8">
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
              <option>Most Recent</option>
              <option>Most Popular</option>
              <option>Most Liked</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
              <option>All Anime</option>
              <option>Dragon Ball</option>
              <option>Naruto</option>
              <option>One Piece</option>
              <option>Attack on Titan</option>
            </select>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleContent.map((content, index) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="h-48 bg-gray-800 flex items-center justify-center relative">
                  <span className="text-gray-500">Content Preview</span>
                  {content.type === 'video' && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      VIDEO
                    </div>
                  )}
                  {content.type === 'audio' && (
                    <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs">
                      AUDIO
                    </div>
                  )}
                  {content.type === 'image' && (
                    <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                      ART
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 hover:text-red-400 cursor-pointer">
                    {content.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">by {content.creator}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        ❤️ {content.likes}
                      </span>
                      <span className="flex items-center">
                        💬 {content.comments}
                      </span>
                    </div>
                    <span>{content.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors">
              Load More Content
            </button>
          </div>
        </main>
      </div>
    </>
  )
}
