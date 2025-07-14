import Head from 'next/head'
import Link from 'next/link'

export default function Gigs() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Creator Gigs - Shonen Ark</title>
        <meta name="description" content="Find freelance opportunities and commission talented creators in the anime community." />
      </Head>


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-blue-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">💼 Creator Gigs</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Connect with talented creators for custom animations, theories, artwork, and more. 
            Commission the perfect content for your vision.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-900 rounded-3xl p-12">
            <span className="text-8xl mb-8 block">🚧</span>
            <h2 className="text-4xl font-bold mb-6">Coming Soon!</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're building an amazing marketplace where fans can commission custom content 
              from our talented creator community. Here's what's coming:
            </p>

            {/* Features Preview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 mb-12">
              <div className="bg-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-3 block">🎨</span>
                <h3 className="font-bold mb-2">Custom Art</h3>
                <p className="text-sm text-gray-400">Character designs, fan art, and illustrations</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-3 block">🎬</span>
                <h3 className="font-bold mb-2">Animations</h3>
                <p className="text-sm text-gray-400">AMVs, fight scenes, and motion graphics</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-3 block">🎵</span>
                <h3 className="font-bold mb-2">Audio Work</h3>
                <p className="text-sm text-gray-400">Sound effects, remixes, and voice acting</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <span className="text-3xl mb-3 block">📝</span>
                <h3 className="font-bold mb-2">Writing</h3>
                <p className="text-sm text-gray-400">Fan theories, reviews, and analysis</p>
              </div>
            </div>

            {/* Placeholder Categories */}
            <div className="space-y-8 mt-16">
              <h3 className="text-2xl font-bold">Popular Categories</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  'Character Commissions',
                  'Theory Writing',
                  'Animation Projects',
                  'Audio Editing',
                  'Manga Colorization',
                  'Video Essays'
                ].map((category, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-6 opacity-60">
                    <h4 className="font-semibold mb-2">{category}</h4>
                    <p className="text-gray-400 text-sm">Starting at $25</p>
                    <div className="mt-4 bg-gray-700 rounded px-4 py-2 text-sm">
                      Coming Soon
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-4">Want Early Access?</h3>
              <p className="text-gray-400 mb-6">
                Join our beta program to be among the first creators and commissioners on the platform.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-bold transition-colors">
                  Join Creator Beta
                </button>
                <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition-colors">
                  Request Feature
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">🔔 Get Notified</h3>
          <p className="text-gray-400 mb-6">
            Be the first to know when Creator Gigs launches!
          </p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-colors">
              Notify Me
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
