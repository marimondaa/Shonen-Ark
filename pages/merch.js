import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Merch() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const merchCategories = [
    { id: 'all', name: 'All Items', icon: '🛍️' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'accessories', name: 'Accessories', icon: '🎒' },
    { id: 'collectibles', name: 'Collectibles', icon: '🎭' },
    { id: 'digital', name: 'Digital', icon: '💻' }
  ]

  const upcomingProducts = [
    {
      id: 1,
      name: 'Shonen Ark Logo Hoodie',
      category: 'clothing',
      price: '$45',
      image: '/placeholder-hoodie.jpg',
      description: 'Premium quality hoodie with embroidered logo'
    },
    {
      id: 2,
      name: 'Theory Master Pin Set',
      category: 'accessories',
      price: '$15',
      image: '/placeholder-pins.jpg',
      description: 'Collectible enamel pins for theory crafters'
    },
    {
      id: 3,
      name: 'Anime Analysis Notebook',
      category: 'accessories',
      price: '$20',
      image: '/placeholder-notebook.jpg',
      description: 'Perfect for jotting down theories and notes'
    },
    {
      id: 4,
      name: 'Digital Wallpaper Pack',
      category: 'digital',
      price: '$5',
      image: '/placeholder-wallpapers.jpg',
      description: 'High-quality wallpapers for all devices'
    },
    {
      id: 5,
      name: 'Limited Edition Art Print',
      category: 'collectibles',
      price: '$30',
      image: '/placeholder-artprint.jpg',
      description: 'Signed artwork by community artists'
    },
    {
      id: 6,
      name: 'Shonen Ark Tote Bag',
      category: 'accessories',
      price: '$25',
      image: '/placeholder-tote.jpg',
      description: 'Eco-friendly tote for conventions'
    }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? upcomingProducts 
    : upcomingProducts.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>Merch Store - Shonen Ark</title>
        <meta name="description" content="Official Shonen Ark merchandise - hoodies, accessories, and collectibles for anime fans." />
      </Head>


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-pink-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">🛍️ Merch Store</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Show your Shonen Ark pride with our exclusive merchandise. 
            From comfy hoodies to collectible pins - gear up for your anime journey!
          </p>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="bg-yellow-900 bg-opacity-30 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-yellow-600 bg-opacity-20 border border-yellow-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">🚧 Store Opening Soon!</h2>
            <p className="text-yellow-200">
              We're preparing an amazing collection of merchandise for our community. 
              Pre-orders and early bird discounts coming soon!
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <div className="flex gap-2 bg-gray-800 rounded-lg p-2 overflow-x-auto">
              {merchCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            🎁 Coming Soon - Preview Collection
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
                {/* Product Image Placeholder */}
                <div className="h-64 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-6xl opacity-80">
                    {product.category === 'clothing' && '👕'}
                    {product.category === 'accessories' && '🎒'}
                    {product.category === 'collectibles' && '🎭'}
                    {product.category === 'digital' && '💻'}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">{product.price}</span>
                    <button 
                      className="bg-gray-700 text-gray-400 px-6 py-2 rounded-lg font-semibold cursor-not-allowed"
                      disabled
                    >
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl opacity-50 mb-4 block">📦</span>
              <h3 className="text-2xl font-bold mb-2">No items in this category yet</h3>
              <p className="text-gray-400">Check back soon for amazing products!</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Merch?</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="text-4xl mb-4 block">✨</span>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-400">High-quality materials and printing for long-lasting wear</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🎨</span>
              <h3 className="text-xl font-bold mb-2">Community Designs</h3>
              <p className="text-gray-400">Featuring artwork from our talented creator community</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">🚚</span>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-400">Quick and reliable delivery worldwide</p>
            </div>
            <div className="text-center">
              <span className="text-4xl mb-4 block">💚</span>
              <h3 className="text-xl font-bold mb-2">Eco-Friendly</h3>
              <p className="text-gray-400">Sustainable materials and responsible production</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Order Signup */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">🎉 Get Early Access</h2>
            <p className="text-xl text-gray-200 mb-8">
              Sign up to be notified when our merch store launches and get exclusive early bird discounts!
            </p>
            
            <form className="max-w-md mx-auto mb-8">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:bg-opacity-30"
                />
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                  Notify Me
                </button>
              </div>
            </form>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-bold mb-1">20% OFF</h4>
                <p className="text-sm text-gray-200">Early bird discount</p>
              </div>
              <div>
                <h4 className="font-bold mb-1">FREE SHIPPING</h4>
                <p className="text-sm text-gray-200">On your first order</p>
              </div>
              <div>
                <h4 className="font-bold mb-1">EXCLUSIVE</h4>
                <p className="text-sm text-gray-200">Limited edition items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Spotlight */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">🌟 Artist Collaborations</h2>
          <p className="text-xl text-gray-400 mb-8">
            We partner with talented artists from our community to create unique designs. 
            Want to see your art on our merch?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold transition-colors">
              Submit Your Art
            </Link>
            <Link href="/about" className="bg-gray-700 hover:bg-gray-600 px-8 py-3 rounded-lg font-bold transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
