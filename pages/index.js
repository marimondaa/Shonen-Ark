
// Shonen Ark MVP – Inspired by Viz.com layout

import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Shonen Ark</title>
        <meta name="description" content="Fan theories, arc breakdowns, and shonen fandom powered by AI." />
      </Head>

      {/* Header */}
      <header className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-950 z-50">
        <h1 className="text-2xl font-bold text-red-500">Shonen Ark</h1>
        <nav className="space-x-6 text-sm">
          <Link href="/arcs">Arcs</Link>
          <Link href="/discover">Discover</Link>
          <Link href="/calendar">Calendar</Link>
          <Link href="/library">Library</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>

      {/* Hero Carousel */}
      <section className="bg-black text-white py-10 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">🔥 Dive into the Latest Theories</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Explore epic fan theories, arc breakdowns, sound edits, and AI‑powered fan commentary. Curated for true shonen fans.</p>
      </section>

      {/* Featured Arcs */}
      <main className="px-6 py-10 max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Featured Arcs</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Jujutsu Kaisen',
              color: 'text-red-400',
              desc: 'Latest fan theories, domain expansions, and Shibuya arc predictions.',
              slug: 'jujutsu-kaisen'
            },
            {
              title: 'One Piece',
              color: 'text-yellow-400',
              desc: 'Egghead Island twists, Luffy’s awakening, and Gorosei secrets.',
              slug: 'one-piece'
            },
            {
              title: 'Solo Leveling',
              color: 'text-blue-400',
              desc: 'Shadow Monarch lore, gate secrets, and fan animations.',
              slug: 'solo-leveling'
            }
          ].map((arc, idx) => (
            <div key={idx} className="bg-gray-900 p-5 rounded-2xl shadow hover:shadow-xl transition">
              <h4 className={`text-xl font-bold ${arc.color}`}>{arc.title}</h4>
              <p className="text-gray-300 mt-2 text-sm">{arc.desc}</p>
              <Link href={`/arc/${arc.slug}`} className="text-blue-400 hover:underline text-sm mt-3 inline-block">Explore &rarr;</Link>
            </div>
          ))}
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-gray-900 py-10 px-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Join the Ark Newsletter</h3>
        <p className="text-sm text-gray-400 mb-4">Get exclusive theories, early AI videos, and digital magazines in your inbox.</p>
        <form className="flex justify-center max-w-md mx-auto">
          <input type="email" placeholder="you@example.com" className="p-2 rounded-l bg-white text-black w-full max-w-sm" />
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
