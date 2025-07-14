import Head from 'next/head'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { fetchAniList } from '../utils/anilist'

export default function Calendar() {
  const [activeTab, setActiveTab] = useState('episodes')

  const [animeEpisodes, setAnimeEpisodes] = useState<any[]>([])
  const [mangaChapters, setMangaChapters] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const query = `query ($page:Int){Page(page:$page){media(type:ANIME,status:RELEASING){id title{romaji} nextAiringEpisode{episode airingAt}}}}`
      const data = await fetchAniList(query, { page: 1 })
      if (data.Page?.media) {
        const mapped = data.Page.media.map((m:any) => ({
          id: m.id,
          title: m.title.romaji,
          episode: `Episode ${m.nextAiringEpisode?.episode}`,
          releaseDay: '',
          releaseTime: '',
          countdown: '',
          studio: '',
          status: 'upcoming'
        }))
        setAnimeEpisodes(mapped)
      }
    }
    load()
  }, [])

  const getCurrentData = () => {
    return activeTab === 'episodes' ? animeEpisodes : mangaChapters
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'season_finale': return 'from-purple-600 to-purple-800'
      case 'milestone': return 'from-yellow-600 to-orange-600'
      default: return 'from-blue-600 to-blue-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'season_finale': return '🎬 Season Finale'
      case 'milestone': return '🎯 Milestone Chapter'
      default: return '📅 Regular Release'
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Release Calendar - Shonen Ark</title>
        <meta name="description" content="Track upcoming anime episodes and manga chapter releases. Never miss a drop!" />
      </Head>

      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">📅 Release Calendar</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Track upcoming chapter and episode drops. Stay ahead of the arc and never miss a release!
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-gray-900 py-8 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('episodes')}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'episodes'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🎬 Anime Episodes
              </button>
              <button
                onClick={() => setActiveTab('chapters')}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === 'chapters'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📚 Manga/Manhwa Chapters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Content */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-green-400 mb-2">3</h3>
              <p className="text-gray-400">Releases This Week</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">12</h3>
              <p className="text-gray-400">Series Tracking</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">1</h3>
              <p className="text-gray-400">Season Finale</p>
            </div>
          </div>

          {/* Release Cards */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {getCurrentData().map((item) => (
              <div key={item.id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Status Badge */}
                <div className={`bg-gradient-to-r ${getStatusColor(item.status)} p-3 text-center`}>
                  <span className="text-sm font-semibold">{getStatusText(item.status)}</span>
                </div>

                {/* Cover Image */}
                <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-6xl opacity-80">
                    {activeTab === 'episodes' ? '📺' : '📖'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-400 font-semibold mb-4">
                    {activeTab === 'episodes' ? item.episode : item.chapter}
                  </p>

                  {/* Release Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Release Day:</span>
                      <span className="font-semibold">{item.releaseDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="font-semibold">{item.releaseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        {activeTab === 'episodes' ? 'Studio:' : 'Magazine:'}
                      </span>
                      <span className="font-semibold">
                        {activeTab === 'episodes' ? item.studio : item.magazine}
                      </span>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="bg-gray-800 rounded-lg p-4 text-center mb-4">
                    <p className="text-sm text-gray-400 mb-1">Releases in</p>
                    <p className="text-2xl font-bold text-green-400">{item.countdown}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold transition-colors">
                      🔔 Remind Me
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                      📤
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add More Series */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              + Add More Series to Track
            </button>
          </div>

          {/* Calendar View Option */}
          <section className="mt-16">
            <div className="bg-gray-900 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">📆 Calendar View</h3>
              <p className="text-gray-400 mb-6">
                Want to see all releases in a traditional calendar format?
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Switch to Calendar View
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

