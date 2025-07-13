import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import PaymentsModal from '../components/PaymentsModal'

export default function Account() {
  // Simulate user session - in real app, this would come from NextAuth
  const [user] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    accountType: 'fan', // 'fan' or 'creator'
    avatar: '/placeholder-avatar.jpg',
    joinedAt: '2025-01-15',
    stats: {
      theoriesShared: 5,
      likesReceived: 123,
      following: 12,
      followers: 8
    }
  })

  const [activeTab, setActiveTab] = useState('overview')
  const [showPaymentsModal, setShowPaymentsModal] = useState(false)

  const followedCreators = [
    { id: 1, name: 'TheoryMaster99', avatar: '🧠', theories: 45, followers: '2.1K' },
    { id: 2, name: 'AnimationKing', avatar: '🎬', videos: 23, followers: '5.4K' },
    { id: 3, name: 'SoundNinja', avatar: '🎵', tracks: 67, followers: '1.8K' }
  ]

  const recentActivity = [
    { type: 'like', content: 'Liked "Gojo Return Theory"', time: '2 hours ago' },
    { type: 'comment', content: 'Commented on "One Piece Final War"', time: '5 hours ago' },
    { type: 'follow', content: 'Started following @TheoryMaster99', time: '1 day ago' },
    { type: 'theory', content: 'Shared "Sukuna\'s True Plan"', time: '3 days ago' }
  ]

  const FanDashboard = () => (
    <div className="space-y-8">
      {/* Followed Creators Feed */}
      <section>
        <h2 className="text-2xl font-bold mb-6">📺 Followed Creators Feed</h2>
        <div className="space-y-4">
          {followedCreators.map((creator) => (
            <div key={creator.id} className="bg-gray-800 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                  {creator.avatar}
                </div>
                <div>
                  <h3 className="font-bold">{creator.name}</h3>
                  <p className="text-gray-400 text-sm">
                    {creator.theories && `${creator.theories} theories`}
                    {creator.videos && `${creator.videos} videos`}
                    {creator.tracks && `${creator.tracks} audio tracks`}
                    {' • '}{creator.followers} followers
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/discover" className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
            Discover More Creators
          </Link>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-bold mb-6">📋 Recent Activity</h2>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-700 last:border-b-0">
                <span className="text-2xl">
                  {activity.type === 'like' && '❤️'}
                  {activity.type === 'comment' && '💬'}
                  {activity.type === 'follow' && '👥'}
                  {activity.type === 'theory' && '🧠'}
                </span>
                <div className="flex-1">
                  <p>{activity.content}</p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )

  const CreatorDashboard = () => (
    <div className="space-y-8">
      {/* Creator Note */}
      <section className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">🚀 Creator Dashboard</h2>
        <p className="text-xl text-gray-200 mb-6">
          Your creator dashboard is coming soon! We're building amazing tools for content creators.
        </p>
        <div className="bg-black bg-opacity-30 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold mb-2">What's Coming:</h3>
          <ul className="text-left space-y-2">
            <li>📊 Analytics & Insights</li>
            <li>💰 Revenue Tracking</li>
            <li>🎨 Content Management Tools</li>
            <li>👥 Audience Engagement Metrics</li>
            <li>🔔 Real-time Notifications</li>
          </ul>
        </div>
        <button className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
          Join Creator Beta Program
        </button>
      </section>

      {/* Upgrade to Creator */}
      <section className="bg-gray-800 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">🌟 Upgrade to Creator Pro</h3>
            <p className="text-gray-400 mb-4">
              Unlock premium features, advanced analytics, and monetization tools.
            </p>
            <ul className="space-y-2 text-sm">
              <li>✅ Custom profile themes</li>
              <li>✅ Priority support</li>
              <li>✅ Advanced analytics</li>
              <li>✅ Revenue sharing program</li>
            </ul>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">$9.99</div>
            <div className="text-gray-400 text-sm mb-4">per month</div>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-400 hover:to-orange-400 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Head>
        <title>My Account - Shonen Ark</title>
        <meta name="description" content="Manage your Shonen Ark account and access your personalized dashboard." />
      </Head>

      <Navbar />

      {/* Profile Header */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            
            {/* User Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-xl text-gray-300 mb-4">@{user.username}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  user.accountType === 'creator' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {user.accountType === 'creator' ? '✨ Creator' : '🎌 Fan'}
                </span>
                <span className="text-gray-400">Joined {user.joinedAt}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{user.stats.theoriesShared}</div>
                <div className="text-sm text-gray-400">Theories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{user.stats.likesReceived}</div>
                <div className="text-sm text-gray-400">Likes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{user.stats.following}</div>
                <div className="text-sm text-gray-400">Following</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{user.stats.followers}</div>
                <div className="text-sm text-gray-400">Followers</div>
              </div>
            </div>

            {/* Upgrade Button */}
            {user.accountType === 'fan' && (
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setShowPaymentsModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                >
                  ✨ Upgrade to Creator Pro
                </button>
                <p className="text-sm text-gray-400 mt-2">Unlock exclusive features</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-gray-900 py-4 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-8">
            {['overview', 'settings', 'billing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Dashboard Content */}
      <main className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            user.accountType === 'fan' ? <FanDashboard /> : <CreatorDashboard />
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">⚙️ Account Settings</h2>
              <p className="text-gray-400">Settings panel coming soon...</p>
            </div>
          )}
          
          {activeTab === 'billing' && (
            <div className="bg-gray-800 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">💳 Billing & Subscription</h2>
                <button
                  onClick={() => setShowPaymentsModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Upgrade Plan
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Current Plan</h3>
                  <p className="text-3xl font-bold text-blue-400 mb-2">Fan Plan</p>
                  <p className="text-gray-400">Free forever • Basic features</p>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Plan Features</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Create and share fan theories
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Follow up to 10 creators
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-500">✗</span>
                      <span className="text-gray-500">Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-500">✗</span>
                      <span className="text-gray-500">Exclusive content access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-gray-500">✗</span>
                      <span className="text-gray-500">Creator analytics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Payments Modal */}
      <PaymentsModal 
        isOpen={showPaymentsModal} 
        onClose={() => setShowPaymentsModal(false)} 
      />
    </div>
  )
}
