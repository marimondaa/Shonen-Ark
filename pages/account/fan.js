import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FanAccount() {
  const [user] = useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    accountType: 'fan',
    avatar: '/placeholder-avatar.jpg',
    joinedAt: '2025-01-15',
    stats: {
      theoriesShared: 5,
      likesReceived: 123,
      following: 12,
      followers: 8,
      commentsPosted: 67,
      bookmarks: 34
    }
  })

  const [activeTab, setActiveTab] = useState('feed')

  const followedCreators = [
    { id: 1, name: 'TheoryMaster99', avatar: '🧠', theories: 45, followers: '2.1K', latest: 'Goku\'s Hidden Power Theory' },
    { id: 2, name: 'AnimationKing', avatar: '🎬', videos: 23, followers: '5.4K', latest: 'Luffy vs Naruto Animation' },
    { id: 3, name: 'SoundWave', avatar: '🎵', tracks: 67, followers: '1.8K', latest: 'Bleach OST Remix' },
  ]

  const bookmarkedContent = [
    { id: 1, title: 'The Truth About Sukuna\'s Fingers', type: 'theory', creator: 'TheoryMaster99', thumbnail: '/placeholder-theory.jpg' },
    { id: 2, title: 'Emotional Naruto Battle Music', type: 'audio', creator: 'SoundWave', thumbnail: '/placeholder-audio.jpg' },
    { id: 3, title: 'Custom Ichigo Design', type: 'art', creator: 'ArtistPro', thumbnail: '/placeholder-art.jpg' }
  ]

  const recentActivity = [
    { id: 1, action: 'liked', content: 'Goku vs Vegeta Theory', time: '2 hours ago' },
    { id: 2, action: 'commented on', content: 'One Piece Timeline Analysis', time: '5 hours ago' },
    { id: 3, action: 'bookmarked', content: 'Custom Luffy Animation', time: '1 day ago' },
    { id: 4, action: 'followed', content: 'TheoryMaster99', time: '2 days ago' }
  ]

  return (
    <>
      <Head>
        <title>Fan Account - {user.name} - Shonen Ark</title>
        <meta name="description" content="Your fan account dashboard on Shonen Ark" />
      </Head>
      
      <div className="bg-gray-950 text-white min-h-screen">
        <main className="max-w-6xl mx-auto p-6">
          {/* Profile Header */}
          <div className="bg-gray-900 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-400">@{user.username}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="bg-blue-600 px-2 py-1 rounded">Fan Account</span>
                  <span className="text-gray-500">Joined {user.joinedAt}</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{user.stats.following}</div>
                <div className="text-gray-400 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{user.stats.bookmarks}</div>
                <div className="text-gray-400 text-sm">Bookmarks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{user.stats.commentsPosted}</div>
                <div className="text-gray-400 text-sm">Comments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{user.stats.likesReceived}</div>
                <div className="text-gray-400 text-sm">Likes Given</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-900 p-1 rounded-lg">
            {['feed', 'following', 'bookmarks', 'activity'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium capitalize transition-colors ${
                  activeTab === tab 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'feed' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-4">Your Personalized Feed</h2>
                <div className="space-y-4">
                  {followedCreators.map((creator) => (
                    <div key={creator.id} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{creator.avatar}</div>
                          <div>
                            <h3 className="font-semibold">{creator.name}</h3>
                            <p className="text-gray-400 text-sm">Latest: {creator.latest}</p>
                          </div>
                        </div>
                        <button className="text-red-400 hover:text-red-300 text-sm">View →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'following' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-4">Following ({user.stats.following})</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {followedCreators.map((creator) => (
                    <div key={creator.id} className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{creator.avatar}</div>
                          <div>
                            <h3 className="font-semibold">{creator.name}</h3>
                            <p className="text-gray-400 text-sm">{creator.followers} followers</p>
                          </div>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                          Unfollow
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {creator.theories && `${creator.theories} theories`}
                        {creator.videos && `${creator.videos} videos`}
                        {creator.tracks && `${creator.tracks} tracks`}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'bookmarks' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-4">Bookmarks ({user.stats.bookmarks})</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarkedContent.map((content) => (
                    <div key={content.id} className="bg-gray-900 rounded-lg overflow-hidden">
                      <div className="h-40 bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-500">Preview</span>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1">{content.title}</h4>
                        <p className="text-gray-400 text-xs">by {content.creator}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500 capitalize">{content.type}</span>
                          <button className="text-red-400 hover:text-red-300 text-xs">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="bg-gray-900 p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-sm">
                          You <span className="text-blue-400">{activity.action}</span> <span className="text-white">{activity.content}</span>
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Upgrade to Creator CTA */}
          <div className="bg-gradient-to-r from-red-600 to-purple-600 p-6 rounded-xl mt-8 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Create?</h3>
            <p className="mb-4 text-red-100">Upgrade to Creator Account and start sharing your theories, animations, and more!</p>
            <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Upgrade to Creator - $4/month
            </button>
          </div>
        </main>
      </div>
    </>
  )
}
