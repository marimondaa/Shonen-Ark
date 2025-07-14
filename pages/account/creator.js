import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CreatorAccount() {
  const [user] = useState({
    id: '1',
    name: 'Creator Pro',
    email: 'creator@example.com',
    username: 'creatorpro',
    accountType: 'creator',
    avatar: '/placeholder-avatar.jpg',
    joinedAt: '2024-11-15',
    subscriptionStatus: 'active',
    stats: {
      theories: 23,
      animations: 12,
      audioTracks: 8,
      totalViews: 45600,
      totalLikes: 2340,
      followers: 1240,
      monthlyEarnings: 0 // Future feature
    }
  })

  const [activeTab, setActiveTab] = useState('dashboard')
  const [uploading, setUploading] = useState(false)

  const recentContent = [
    { id: 1, title: 'The Secret of Sukuna\'s Domain', type: 'theory', views: 1234, likes: 89, status: 'published' },
    { id: 2, title: 'Goku vs Saitama Animation', type: 'animation', views: 5678, likes: 234, status: 'published' },
    { id: 3, title: 'One Piece Emotional OST', type: 'audio', views: 890, likes: 45, status: 'draft' },
  ]

  const analytics = {
    totalViews: 45600,
    weeklyViews: 3240,
    totalLikes: 2340,
    weeklyLikes: 187,
    newFollowers: 23,
    engagementRate: 8.7
  }

  const handleUpload = (type) => {
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      alert(`${type} upload feature coming soon!`)
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>Creator Dashboard - {user.name} - Shonen Ark</title>
        <meta name="description" content="Your creator dashboard on Shonen Ark" />
      </Head>
      
      <div className="bg-gray-950 text-white min-h-screen">
        <main className="max-w-6xl mx-auto p-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-900 to-red-900 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                  🎨
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-purple-200">@{user.username}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span className="bg-purple-600 px-2 py-1 rounded">Creator Pro</span>
                    <span className="bg-green-600 px-2 py-1 rounded">Active Subscription</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{user.stats.followers}</div>
                <div className="text-purple-200 text-sm">Followers</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">{analytics.totalViews.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Views</div>
              <div className="text-green-400 text-xs">+{analytics.weeklyViews} this week</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-400">{analytics.totalLikes.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Likes</div>
              <div className="text-green-400 text-xs">+{analytics.weeklyLikes} this week</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">{user.stats.followers}</div>
              <div className="text-gray-400 text-sm">Followers</div>
              <div className="text-green-400 text-xs">+{analytics.newFollowers} this week</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">{analytics.engagementRate}%</div>
              <div className="text-gray-400 text-sm">Engagement</div>
              <div className="text-green-400 text-xs">Above average</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-900 p-1 rounded-lg">
            {['dashboard', 'upload', 'content', 'analytics', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium capitalize transition-colors ${
                  activeTab === tab 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Recent Content</h2>
                    <div className="space-y-3">
                      {recentContent.map((content) => (
                        <div key={content.id} className="bg-gray-900 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{content.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs ${
                              content.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'
                            }`}>
                              {content.status}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-400">
                            <span className="capitalize">{content.type}</span>
                            <div className="space-x-3">
                              <span>👁️ {content.views}</span>
                              <span>❤️ {content.likes}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                      <button 
                        onClick={() => handleUpload('theory')}
                        className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-lg text-left transition-colors"
                      >
                        <div className="font-semibold">📝 Write New Theory</div>
                        <div className="text-sm text-blue-200">Share your latest anime insights</div>
                      </button>
                      <button 
                        onClick={() => handleUpload('animation')}
                        className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-lg text-left transition-colors"
                      >
                        <div className="font-semibold">🎬 Upload Animation</div>
                        <div className="text-sm text-green-200">Share your fan animations</div>
                      </button>
                      <button 
                        onClick={() => handleUpload('audio')}
                        className="w-full bg-purple-600 hover:bg-purple-700 p-4 rounded-lg text-left transition-colors"
                      >
                        <div className="font-semibold">🎵 Upload Audio</div>
                        <div className="text-sm text-purple-200">Share music and sound effects</div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'upload' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-6">Upload New Content</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-900 p-6 rounded-lg text-center">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="font-bold mb-2">Theory/Blog Post</h3>
                    <p className="text-gray-400 mb-4 text-sm">Write and publish your anime theories</p>
                    <button 
                      onClick={() => handleUpload('theory')}
                      disabled={uploading}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors disabled:opacity-50"
                    >
                      {uploading ? 'Processing...' : 'Create Theory'}
                    </button>
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-lg text-center">
                    <div className="text-4xl mb-4">🎬</div>
                    <h3 className="font-bold mb-2">Animation/Video</h3>
                    <p className="text-gray-400 mb-4 text-sm">Upload your fan animations and videos</p>
                    <button 
                      onClick={() => handleUpload('animation')}
                      disabled={uploading}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors disabled:opacity-50"
                    >
                      {uploading ? 'Processing...' : 'Upload Video'}
                    </button>
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-lg text-center">
                    <div className="text-4xl mb-4">🎵</div>
                    <h3 className="font-bold mb-2">Audio/Music</h3>
                    <p className="text-gray-400 mb-4 text-sm">Share your soundtracks and effects</p>
                    <button 
                      onClick={() => handleUpload('audio')}
                      disabled={uploading}
                      className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors disabled:opacity-50"
                    >
                      {uploading ? 'Processing...' : 'Upload Audio'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'content' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">All Content</h2>
                  <div className="flex space-x-2">
                    <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm">
                      <option>All Types</option>
                      <option>Theories</option>
                      <option>Animations</option>
                      <option>Audio</option>
                    </select>
                    <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm">
                      <option>All Status</option>
                      <option>Published</option>
                      <option>Draft</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {recentContent.map((content) => (
                    <div key={content.id} className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold mb-1">{content.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="capitalize">{content.type}</span>
                          <span>👁️ {content.views}</span>
                          <span>❤️ {content.likes}</span>
                          <span className={`px-2 py-1 rounded ${
                            content.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}>
                            {content.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                        <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-6">Analytics Dashboard</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="font-bold mb-4">Performance Overview</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Content</span>
                        <span className="font-bold">{user.stats.theories + user.stats.animations + user.stats.audioTracks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Views per Content</span>
                        <span className="font-bold">{Math.round(analytics.totalViews / (user.stats.theories + user.stats.animations + user.stats.audioTracks))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engagement Rate</span>
                        <span className="font-bold text-green-400">{analytics.engagementRate}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="font-bold mb-4">Growth Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Follower Growth (7 days)</span>
                        <span className="font-bold text-green-400">+{analytics.newFollowers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>View Growth (7 days)</span>
                        <span className="font-bold text-green-400">+{analytics.weeklyViews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Like Growth (7 days)</span>
                        <span className="font-bold text-green-400">+{analytics.weeklyLikes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-6">Creator Settings</h2>
                <div className="space-y-6">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="font-bold mb-4">Subscription Status</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Creator Pro Plan</p>
                        <p className="text-gray-400 text-sm">$4.00/month • Next billing: Jan 15, 2025</p>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">
                        Manage Subscription
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="font-bold mb-4">Content Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span>Allow comments on my content</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span>Email notifications for new followers</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span>Auto-publish to discovery feed</span>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
