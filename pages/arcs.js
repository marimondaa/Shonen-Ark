import Head from 'next/head'
import Link from 'next/link'

export default function Arcs() {
  const arcs = [
    {
      title: 'Shibuya Incident',
      anime: 'Jujutsu Kaisen',
      desc: 'Chaos, betrayal, and Gojo’s fate — full arc theory breakdowns.',
      slug: 'shibuya-incident'
    },
    {
      title: 'Egghead Island',
      anime: 'One Piece',
      desc: 'Vegapunk, void century leaks, and the Gorosei’s role revealed.',
      slug: 'egghead-island'
    },
    {
      title: 'Red Gate Raid',
      anime: 'Solo Leveling',
      desc: 'Jinwoo awakens. S-rank threats. Shadow monarch rises.',
      slug: 'red-gate-raid'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Head>
        <title>Arcs | Shonen Ark</title>
        <meta name="description" content="Browse iconic arcs from top shonen anime with AI-enhanced theories and community insights." />
      </Head>


      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-red-400">Explore Arcs</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {arcs.map((arc, idx) => (
            <div key={idx} className="bg-gray-900 rounded-2xl p-5 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{arc.title}</h2>
              <p className="text-sm text-gray-400">{arc.anime}</p>
              <p className="mt-2 text-sm text-gray-300">{arc.desc}</p>
              <Link href={`/arc/${arc.slug}`} className="text-blue-400 text-sm mt-3 inline-block hover:underline">
                Open Arc →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

