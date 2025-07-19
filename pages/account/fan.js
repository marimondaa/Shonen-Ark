import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../src/lib/hooks/useAuth';
import { mockUserActivity, mockSubscriptions, mockBookmarks } from '../../src/lib/utils/mockData';

const FanDashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [subscriptions, setSubscriptions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated()) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Load data from centralized mock data
        setSubscriptions(mockSubscriptions);
        setBookmarks(mockBookmarks);
        setActivity(mockUserActivity);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  const handleUpgrade = async (priceId) => {
    setUpgradeLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceId,
          successUrl: `${window.location.origin}/account/fan?success=true`,
          cancelUrl: `${window.location.origin}/account/fan?canceled=true`
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    } finally {
      setUpgradeLoading(false);
    }
  };

  const handleBillingPortal = async () => {
    setBillingLoading(true);
    try {
      const response = await fetch('/api/stripe/billing-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Failed to open billing portal:', error);
    } finally {
      setBillingLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Show loading if still checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-purple-200">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect in useEffect)
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Fan Dashboard - Shonen Ark</title>
        <meta name="description" content="Your personal fan dashboard for theories, bookmarks, and subscriptions." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
        {/* Header */}
        <motion.header 
          className="bg-gradient-to-r from-purple-900 to-black py-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-6">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 shrine-glow rounded-full flex items-center justify-center overflow-hidden"
              >
                <img 
                  src="/brand-logo.png" 
                  alt="Shonen Ark" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold mystical-title mb-2">
                  Welcome back, {user?.username || 'Fan'}!
                </h1>
                <p className="text-xl text-purple-200 font-mystical">
                  Your personal theory hub awaits
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tab Navigation */}
          <motion.div 
            className="flex border-b border-purple/20 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'subscriptions', label: 'Subscriptions', icon: '⭐' },
              { id: 'bookmarks', label: 'Bookmarks', icon: '🔖' },
              { id: 'activity', label: 'Activity', icon: '📝' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all relative ${
                  activeTab === tab.id
                    ? 'text-purple'
                    : 'text-grey hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple"
                  />
                )}
              </button>
            ))}
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <motion.div 
                className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* User Profile */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-dark-purple/30 p-6 rounded-lg border border-purple/20 shrine-glow lg:col-span-3"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 shrine-glow rounded-full flex items-center justify-center bg-purple/20">
                        <span className="text-2xl">{user?.role === 'admin' ? '👑' : '🌟'}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-purple">
                          {user?.username} {user?.role === 'admin' && <span className="text-yellow-400">👑</span>}
                        </h3>
                        <p className="text-grey mb-4">{user?.profile?.bio || 'No bio available'}</p>
                        {user?.profile?.badges && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {user.profile.badges.map((badge, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-purple/20 text-purple border border-purple/30"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        )}
                        {user?.profile?.favoriteAnime && user.profile.favoriteAnime.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-purple mb-2">Favorite Anime:</h4>
                            <div className="flex flex-wrap gap-2">
                              {user.profile.favoriteAnime.slice(0, 4).map((anime, index) => (
                                <span 
                                  key={index}
                                  className="px-2 py-1 rounded text-xs bg-black/30 text-grey"
                                >
                                  {anime}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick Stats */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-dark-purple/30 p-6 rounded-lg border border-purple/20 shrine-glow"
                  >
                    <h3 className="text-xl font-bold mb-4 text-purple">📊 Your Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-grey">Theories Posted:</span>
                        <span className="text-white font-medium">{user?.stats?.theoriesPosted || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-grey">Total Upvotes:</span>
                        <span className="text-white font-medium">{user?.stats?.upvotes || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-grey">Comments Received:</span>
                        <span className="text-white font-medium">{user?.stats?.commentsReceived || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-grey">Followers:</span>
                        <span className="text-white font-medium">{user?.stats?.followers || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-grey">Following:</span>
                        <span className="text-white font-medium">{user?.stats?.following || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-grey">Member Since:</span>
                        <span className="text-white font-medium">{user?.stats?.joinedDate || 'Recent'}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent Activity */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-dark-purple/30 p-6 rounded-lg border border-purple/20 shrine-glow"
                  >
                    <h3 className="text-xl font-bold mb-4 text-purple">📝 Recent Activity</h3>
                    <div className="space-y-3">
                      {activity.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-start space-x-3">
                          <span className="text-sm">
                            {item.type === 'comment' ? '💬' : item.type === 'like' ? '👍' : '🔖'}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm text-grey line-clamp-2">
                              {item.type === 'comment' ? `Commented: "${item.content}"` : 
                               item.type === 'like' ? `Liked: ${item.target}` :
                               `Bookmarked: ${item.target}`}
                            </p>
                            <span className="text-xs text-grey/60">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-dark-purple/30 p-6 rounded-lg border border-purple/20 shrine-glow"
                  >
                    <h3 className="text-xl font-bold mb-4 text-purple">⚡ Quick Actions</h3>
                    <div className="space-y-3">
                      <Link href="/theories" className="block p-3 bg-purple/20 rounded-lg hover:bg-purple/30 transition-colors">
                        <span className="text-sm font-medium">🔍 Browse Theories</span>
                      </Link>
                      <Link href="/discovery" className="block p-3 bg-purple/20 rounded-lg hover:bg-purple/30 transition-colors">
                        <span className="text-sm font-medium">✨ Discover Creators</span>
                      </Link>
                      <Link href="/calendar" className="block p-3 bg-purple/20 rounded-lg hover:bg-purple/30 transition-colors">
                        <span className="text-sm font-medium">📅 Check Calendar</span>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Subscriptions Tab */}
              {activeTab === 'subscriptions' && (
                <div className="space-y-8">
                  {/* Current Subscription Status */}
                  <motion.div 
                    variants={itemVariants}
                    className="bg-dark-purple/30 p-6 rounded-lg border border-purple/20"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-purple">Current Plan</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-grey/20 text-grey">
                        Free Tier
                      </span>
                    </div>
                    <p className="text-grey mb-6">
                      Upgrade to unlock premium features and support your favorite creators!
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.button
                        onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_CREATOR)}
                        disabled={upgradeLoading}
                        className="bg-purple hover:bg-dark-purple disabled:bg-grey text-white py-3 px-6 rounded-lg transition-colors font-medium"
                        whileHover={!upgradeLoading ? { scale: 1.02 } : {}}
                        whileTap={!upgradeLoading ? { scale: 0.98 } : {}}
                      >
                        {upgradeLoading ? 'Processing...' : 'Upgrade to Creator ($9.99/mo)'}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM)}
                        disabled={upgradeLoading}
                        className="bg-gradient-to-r from-purple to-pink-500 hover:from-dark-purple hover:to-pink-600 disabled:bg-grey text-white py-3 px-6 rounded-lg transition-colors font-medium"
                        whileHover={!upgradeLoading ? { scale: 1.02 } : {}}
                        whileTap={!upgradeLoading ? { scale: 0.98 } : {}}
                      >
                        {upgradeLoading ? 'Processing...' : 'Upgrade to Premium ($19.99/mo)'}
                      </motion.button>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button
                        onClick={handleBillingPortal}
                        disabled={billingLoading}
                        className="text-purple hover:text-white transition-colors text-sm underline"
                      >
                        {billingLoading ? 'Loading...' : 'Manage Billing'}
                      </button>
                    </div>
                  </motion.div>

                  {/* Creator Subscriptions */}
                  <div>
                    <h3 className="text-xl font-bold text-purple mb-6">Creator Subscriptions</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {subscriptions.map((sub) => (
                        <motion.div
                          key={sub.id}
                          variants={itemVariants}
                          className="bg-dark-purple/30 p-6 rounded-lg border border-purple/20 shrine-glow"
                        >
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center">
                              👤
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-white">{sub.creator}</h3>
                              <p className="text-sm text-grey">{sub.subscribers.toLocaleString()} subscribers</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              sub.tier === 'premium' 
                                ? 'bg-purple/20 text-purple' 
                                : 'bg-grey/20 text-grey'
                            }`}>
                              {sub.tier}
                            </span>
                          </div>
                          
                          <p className="text-sm text-grey mb-4">Latest: {sub.latestContent}</p>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-grey">Next payment: {sub.nextPayment}</span>
                            <button className="text-purple hover:text-white transition-colors">
                              Manage
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bookmarks Tab */}
              {activeTab === 'bookmarks' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarks.map((bookmark) => (
                    <motion.div
                      key={bookmark.id}
                      variants={itemVariants}
                      className="bg-dark-purple/30 rounded-lg overflow-hidden border border-purple/20 shrine-glow group"
                    >
                      <div className="aspect-video bg-purple/20 flex items-center justify-center">
                        <span className="text-4xl opacity-50">🔖</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-white mb-2 line-clamp-2">{bookmark.title}</h3>
                        <p className="text-sm text-purple mb-2">by {bookmark.creator}</p>
                        <div className="flex justify-between items-center text-sm text-grey">
                          <span>#{bookmark.category}</span>
                          <span>{new Date(bookmark.bookmarkedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div className="space-y-4">
                  {activity.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="bg-dark-purple/30 p-6 rounded-lg border border-purple/20 shrine-glow"
                    >
                      <div className="flex items-start space-x-4">
                        <span className="text-2xl">
                          {item.type === 'comment' ? '💬' : item.type === 'like' ? '👍' : '🔖'}
                        </span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-white">
                              {item.type === 'comment' ? 'Comment' : 
                               item.type === 'like' ? 'Liked' : 'Bookmarked'}
                            </h4>
                            <span className="text-sm text-grey">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-grey">{item.target}</p>
                          {item.content && (
                            <p className="text-sm text-white/80 mt-2 italic">"{item.content}"</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default FanDashboard;

// Disable static generation for this page since it requires authentication
export async function getServerSideProps() {
  return {
    props: {}
  };
}
