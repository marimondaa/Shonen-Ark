import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { motion } from 'framer-motion'

export default function Discover() {
  const categories = [
    {
      name: 'Fan Fights',
      description: 'Epic battle videos created by fans',
      icon: '⚔️',
      slug: 'fan-fights',
      color: 'from-red-600 to-orange-500',
      count: '1.2k videos'
    },
    {
      name: 'Audio FX',
      description: 'Custom soundscapes and music',
      icon: '🎵',
      slug: 'audio-fx',
      color: 'from-purple-600 to-blue-500',
      count: '840 tracks'
    },
    {
      name: 'Character Designs',
      description: 'Original character art and concepts',
      icon: '🎨',
      slug: 'character-designs',
      color: 'from-green-600 to-teal-500',
      count: '2.1k designs'
    }
  ]

  return (
    <>
      <Head>
        <title>Discover - Shonen Ark</title>
        <meta name="description" content="Discover fan-created content: epic fights, audio effects, and character designs" />
      </Head>
      
      <div className="bg-gray-950 text-white min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto p-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              Discovery Feed
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore fan-created content across different categories. Upload your own creations and discover amazing work from the community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/discovery/${category.slug}`}>
                  <div className={`bg-gradient-to-br ${category.color} p-6 rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/80 mb-3">{category.description}</p>
                    <div className="text-sm text-white/60">{category.count}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Recent Uploads Section */}
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Uploads</h2>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">
                Upload Content
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for recent uploads */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">Preview Thumbnail</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Sample Content {item}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>by Creator{item}</span>
                      <div className="flex items-center space-x-2">
                        <span>❤️ 12</span>
                        <span>💬 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Trending This Week</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Top Fan Fight</h3>
                <p className="text-gray-400 mb-3">Epic battle between Goku and Vegeta recreation</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-400">+234% engagement</span>
                  <span className="text-gray-500">1.2k views</span>
                </div>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Featured Audio</h3>
                <p className="text-gray-400 mb-3">One Piece emotional OST remix</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-400">+187% plays</span>
                  <span className="text-gray-500">890 listens</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

