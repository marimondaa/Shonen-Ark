import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
// import { motion } from 'framer-motion' // Install with: npm install framer-motion

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Shonen Ark - Fan Theory & Media Hub</title>
        <meta name="description" content="Fan theories, arc breakdowns, and shonen fandom powered by AI." />
      </Head>

      <Navbar />

      {/* Hero Banner Section with Bonsai Placeholder */}
      <section className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Shonen Ark</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Dive into epic fan theories, arc breakdowns, animations, and AI-powered commentary. 
            Where shonen passion meets creative community.
          </p>
          {/* Bonsai Component Placeholder */}
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-4xl">🌲</span>
          </div>
          <p className="text-sm text-gray-300 mt-4">Interactive Bonsai Component (Coming Soon)</p>
        </div>
      </section>

      {/* 1. Featured Arcs Section */}
      <main className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">🔥 Featured Arcs</h2>
          <p className="text-gray-400 text-lg">Discover the most talked-about story arcs in the shonen universe</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Jujutsu Kaisen: Shibuya Incident',
              color: 'from-red-500 to-red-700',
              desc: 'Latest fan theories, domain expansions, and Shibuya arc predictions.',
              slug: 'jujutsu-kaisen'
            },
            {
              title: 'One Piece: Egghead Island',
              color: 'from-yellow-500 to-orange-600',
              desc: 'Egghead Island twists, Luffy\'s awakening, and Gorosei secrets.',
              slug: 'one-piece'
            },
            {
              title: 'Solo Leveling: Shadow Monarch',
              color: 'from-blue-500 to-purple-600',
              desc: 'Shadow Monarch lore, gate secrets, and fan animations.',
              slug: 'solo-leveling'
            }
          ].map((arc, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300">
                {/* Placeholder Image */}
                <div className={`h-64 bg-gradient-to-br ${arc.color} flex items-center justify-center`}>
                  <span className="text-6xl opacity-80">🎌</span>
                </div>
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{arc.title}</h3>
                  <p className="text-gray-200 text-sm mb-4">{arc.desc}</p>
                  <Link href={`/arcs/${arc.slug}`} className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold">
                    Explore Arc <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 2. Fan Content Highlight Section */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">✨ Fan Content Spotlight</h2>
            <p className="text-gray-400 text-lg">Amazing creations from our talented community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: 'Theory', title: 'Gojo\'s Return Theory', author: 'TheoryMaster99', likes: 234 },
              { type: 'Animation', title: 'Luffy vs Kaido AMV', author: 'AnimeFanatic', likes: 189 },
              { type: 'Audio Edit', title: 'Domain Expansion SFX', author: 'SoundNinja', likes: 156 },
              { type: 'Art', title: 'Chainsaw Man Fanart', author: 'ArtisticSoul', likes: 298 }
            ].map((content, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                {/* Placeholder Thumbnail */}
                <div className="h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-3xl">🎨</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">{content.type}</span>
                  <span className="text-gray-400 text-sm">❤️ {content.likes}</span>
                </div>
                <h3 className="font-semibold mb-1">{content.title}</h3>
                <p className="text-gray-400 text-sm">by {content.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Community Highlights Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🏆 Community Highlights</h2>
            <p className="text-gray-400 text-lg">Celebrating our most active and creative members</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Creator of the Month */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-1 rounded-2xl">
              <div className="bg-gray-900 rounded-xl p-8 h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👑</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Creator of the Month</h3>
                  <p className="text-gray-300 mb-4">@ShronenMaster</p>
                  <p className="text-sm text-gray-400">15 theories published, 2.3k total likes</p>
                </div>
              </div>
            </div>

            {/* Trending Discussion */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">🔥 Trending Discussion</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">Is Gojo really dead?</p>
                  <p className="text-sm text-gray-400">142 comments • 2 hours ago</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold">One Piece Chapter 1100 predictions</p>
                  <p className="text-sm text-gray-400">89 comments • 5 hours ago</p>
                </div>
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">📊 This Week</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">New Theories</span>
                  <span className="font-bold text-green-400">+23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fan Videos</span>
                  <span className="font-bold text-blue-400">+8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">New Members</span>
                  <span className="font-bold text-purple-400">+156</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 py-10 px-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Join the Ark Newsletter</h3>
        <p className="text-sm text-gray-400 mb-4">
          Get exclusive theories, early AI videos, and digital magazines in your inbox.
        </p>
        <form className="flex justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="you@example.com"
            className="p-2 rounded-l bg-white text-black w-full max-w-sm"
          />
          <button className="bg-red-500 px-4 rounded-r text-white font-semibold">Subscribe</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-gray-800 text-xs text-gray-500">
        &copy; 2025 Shonen Ark. All rights reserved. | <Link href="/about">About</Link> | <Link href="/terms">Terms</Link>
      </footer>
    </div>
  )
}
