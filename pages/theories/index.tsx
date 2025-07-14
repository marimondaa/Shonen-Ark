import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { supabase } from '../../utils/supabaseClient'

export default function Theories() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [selectedAnime, setSelectedAnime] = useState('all')

  const [theories, setTheories] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('theories').select('*').limit(20)
      if (data) setTheories(data)
    }
    load()
  }, [])

  const filteredTheories = theories.filter((theory: any) => {
    const matchesSearch = theory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesAnime = selectedAnime === 'all' || 
                        theory.tags.some(tag => tag.toLowerCase().includes(selectedAnime.toLowerCase()))
    return matchesSearch && matchesAnime
  })

  const sortedTheories = [...filteredTheories].sort((a: any, b: any) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    if (sortBy === 'popular') return b.likes - a.likes
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Fan Theories - Shonen Ark</title>
        <meta name="description" content="Discover and share epic fan theories about your favorite shonen anime and manga." />
      </Head>

      <Navbar />

      {/* Header Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-900 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">🧠 Fan Theories</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Dive deep into the mysteries of your favorite series. Share theories, debate possibilities, and uncover hidden truths.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-900 py-8 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search theories or anime titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              {/* Anime Filter */}
              <select
                value={selectedAnime}
                onChange={(e) => setSelectedAnime(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Anime</option>
                <option value="jujutsu">Jujutsu Kaisen</option>
                <option value="one piece">One Piece</option>
                <option value="chainsaw">Chainsaw Man</option>
                <option value="solo">Solo Leveling</option>
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Create Theory Button */}
            <Link href="/theories/create" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
              + Create Theory
            </Link>
          </div>
        </div>
      </section>

      {/* Theories List */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8">
            {sortedTheories.map((theory) => (
              <div key={theory.id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  {/* Thumbnail */}
                  <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-6xl opacity-80">📚</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {theory.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {theory.hasSpoilers && (
                        <span className="text-xs bg-red-600 px-2 py-1 rounded-full">⚠️ Spoilers</span>
                      )}
                    </div>

                    <Link href={`/theories/${theory.slug}`}>
                      <h2 className="text-2xl font-bold mb-3 hover:text-blue-400 transition-colors cursor-pointer">
                        {theory.title}
                      </h2>
                    </Link>

                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {theory.preview}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>by {theory.author}</span>
                        <span>•</span>
                        <span>{theory.createdAt}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
                          ❤️ {theory.likes}
                        </button>
                        <Link href={`/theories/${theory.slug}`} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                          💬 {theory.comments}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-800 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
              Load More Theories
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
