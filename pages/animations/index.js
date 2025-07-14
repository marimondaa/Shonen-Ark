import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Animations() {
  const [activeTab, setActiveTab] = useState('fights')
  const [searchTerm, setSearchTerm] = useState('')

  const fanFights = [
    {
      id: 1,
      title: 'Gojo vs Sukuna - Full Domain Battle',
      creator: 'AnimeMasterStudio',
      tags: ['Jujutsu Kaisen', 'Epic Battle', '3D Animation'],
      duration: '5:23',
      likes: 12500,
      comments: 342,
      views: '2.1M',
      thumbnail: '/placeholder-fight-1.jpg'
    },
    {
      id: 2,
      title: 'Luffy Gear 5 vs Kaido - Final Clash',
      creator: 'OnePieceFanArt',
      tags: ['One Piece', 'Gear 5', 'Dragon Form'],
      duration: '7:45',
      likes: 18300,
      comments: 567,
      views: '3.4M',
      thumbnail: '/placeholder-fight-2.jpg'
    },
    {
      id: 3,
      title: 'Sung Jin-Woo vs Antares - Shadow Army',
      creator: 'SoloLevelingFan',
      tags: ['Solo Leveling', 'Shadow Monarch', 'Epic'],
      duration: '6:12',
      likes: 9800,
      comments: 234,
      views: '1.8M',
      thumbnail: '/placeholder-fight-3.jpg'
    },
    {
      id: 4,
      title: 'Denji vs Chainsaw Devil - Transformation',
      creator: 'ChainsawAnimator',
      tags: ['Chainsaw Man', 'Transformation', 'Gore'],
      duration: '4:56',
      likes: 7650,
      comments: 189,
      views: '1.2M',
      thumbnail: '/placeholder-fight-4.jpg'
    }
  ]

  const audioFX = [
    {
      id: 1,
      title: 'Domain Expansion Sound Pack',
      creator: 'SoundDesignOtaku',
      tags: ['Jujutsu Kaisen', 'Sound Effects', 'Domains'],
      duration: '2:30',
      likes: 5400,
      comments: 123,
      downloads: '45K',
      thumbnail: '/placeholder-audio-1.jpg'
    },
    {
      id: 2,
      title: 'Devil Fruit Powers SFX Collection',
      creator: 'OnePieceSounds',
      tags: ['One Piece', 'Devil Fruit', 'Powers'],
      duration: '8:15',
      likes: 7200,
      comments: 156,
      downloads: '67K',
      thumbnail: '/placeholder-audio-2.jpg'
    },
    {
      id: 3,
      title: 'Shadow Emergence Sound Effects',
      creator: 'ShadowSoundStudio',
      tags: ['Solo Leveling', 'Shadows', 'Dark'],
      duration: '3:45',
      likes: 4300,
      comments: 89,
      downloads: '32K',
      thumbnail: '/placeholder-audio-3.jpg'
    },
    {
      id: 4,
      title: 'Chainsaw Engine Revving Pack',
      creator: 'MetalSoundFX',
      tags: ['Chainsaw Man', 'Mechanical', 'Intense'],
      duration: '1:47',
      likes: 3100,
      comments: 67,
      downloads: '28K',
      thumbnail: '/placeholder-audio-4.jpg'
    }
  ]

  const characterDesigns = [
    {
      id: 1,
      title: 'Adult Megumi Fushiguro Concept',
      creator: 'JJKArtist2025',
      tags: ['Jujutsu Kaisen', 'Character Design', 'Concept Art'],
      likes: 8900,
      comments: 234,
      saves: '12K',
      thumbnail: '/placeholder-design-1.jpg'
    },
    {
      id: 2,
      title: 'Straw Hat Crew Timeskip Redesign',
      creator: 'PirateArtist',
      tags: ['One Piece', 'Redesign', 'Timeskip'],
      likes: 15600,
      comments: 445,
      saves: '23K',
      thumbnail: '/placeholder-design-2.jpg'
    },
    {
      id: 3,
      title: 'Shadow Monarch Armor Variants',
      creator: 'SoloDesigner',
      tags: ['Solo Leveling', 'Armor Design', 'Variants'],
      likes: 6700,
      comments: 178,
      saves: '9.5K',
      thumbnail: '/placeholder-design-3.jpg'
    },
    {
      id: 4,
      title: 'Makima Alternative Outfits',
      creator: 'DevilDesigner',
      tags: ['Chainsaw Man', 'Fashion', 'Alternative'],
      likes: 11200,
      comments: 356,
      saves: '18K',
      thumbnail: '/placeholder-design-4.jpg'
    }
  ]

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'fights': return fanFights
      case 'audio': return audioFX
      case 'designs': return characterDesigns
      default: return fanFights
    }
  }

  const filteredContent = getCurrentContent().filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const renderCard = (item) => {
    const isAudio = activeTab === 'audio'
    const isDesign = activeTab === 'designs'
    
    return (
      <div key={item.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <span className="text-4xl opacity-80">
            {activeTab === 'fights' && '⚔️'}
            {activeTab === 'audio' && '🎵'}
            {activeTab === 'designs' && '🎨'}
          </span>
          {activeTab === 'fights' && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-sm">
              {item.duration}
            </div>
          )}
          {isAudio && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-sm">
              {item.duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-3">by {item.creator}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                ❤️ {item.likes.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                💬 {item.comments}
              </span>
            </div>
            <div className="text-right">
              {activeTab === 'fights' && <span>👁️ {item.views}</span>}
              {isAudio && <span>⬇️ {item.downloads}</span>}
              {isDesign && <span>📌 {item.saves}</span>}
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full mt-4 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition-colors">
            {activeTab === 'fights' && '▶️ Watch'}
            {activeTab === 'audio' && '🎧 Listen'}
            {activeTab === 'designs' && '👁️ View'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Fan Animations - Shonen Ark</title>
        <meta name="description" content="Discover amazing fan-created animations, audio effects, and character designs from the shonen community." />
      </Head>


      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 to-pink-900 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">🎬 Fan Animations</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Experience incredible fan-created content - from epic battle animations to custom sound effects and original character designs.
          </p>
        </div>
      </section>

      {/* Search and Tabs */}
      <section className="bg-gray-900 py-8 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search animations, audio, or designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md mx-auto block px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('fights')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'fights'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ⚔️ Fan Fights ({fanFights.length})
              </button>
              <button
                onClick={() => setActiveTab('audio')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'audio'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🎵 Audio FX ({audioFX.length})
              </button>
              <button
                onClick={() => setActiveTab('designs')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'designs'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🎨 Character Designs ({characterDesigns.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredContent.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContent.map(renderCard)}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl opacity-50 mb-4 block">🔍</span>
              <h3 className="text-2xl font-bold mb-2">No results found</h3>
              <p className="text-gray-400">Try adjusting your search terms or browse different categories.</p>
            </div>
          )}

          {/* Load More */}
          {filteredContent.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                Load More Content
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
