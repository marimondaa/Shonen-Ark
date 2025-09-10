import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Head from 'next/head';

const AdminDashboard = () => {
  const { data: session, status } = useSession() || {};
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('moderation');
  const [stats, setStats] = useState({});
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (status === 'loading') return;
    if (!session?.user || session.user.role !== 'admin') {
      router.push('/');
      return;
    }

    loadDashboardData();
  }, [session, status, router]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load admin stats
      const statsResponse = await fetch('/api/admin/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Load flagged content
      const flaggedResponse = await fetch('/api/admin/flagged-content');
      if (flaggedResponse.ok) {
        const flaggedData = await flaggedResponse.json();
        setFlaggedContent(flaggedData.content || []);
      }
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModerateContent = async (contentId, action) => {
    try {
      const response = await fetch('/api/admin/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId, action })
      });

      if (response.ok) {
        // Remove from flagged list
        setFlaggedContent(prev => 
          prev.filter(item => item.id !== contentId)
        );
      }
    } catch (error) {
      console.error('Moderation failed:', error);
    }
  };

  const tabs = [
    { id: 'moderation', label: 'Content Moderation', icon: '🛡️' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Shonen Ark</title>
        <meta name="description" content="Admin dashboard for content moderation and site management" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="bg-gradient-to-b from-purple-900 to-black py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mystical-title">
              Admin Dashboard
            </h1>
            <p className="text-purple-200 mt-2">
              Content moderation and site management
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-black/50 p-6 rounded-lg border border-purple/20">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-2xl font-bold text-white">{stats.totalTheories || 0}</div>
              <div className="text-purple-200 text-sm">Total Theories</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-black/50 p-6 rounded-lg border border-purple/20">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-2xl font-bold text-white">{stats.totalUsers || 0}</div>
              <div className="text-purple-200 text-sm">Total Users</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-black/50 p-6 rounded-lg border border-purple/20">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-2xl font-bold text-orange-400">{stats.flaggedContent || 0}</div>
              <div className="text-purple-200 text-sm">Flagged Content</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-black/50 p-6 rounded-lg border border-purple/20">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-2xl font-bold text-green-400">{stats.activeSubscriptions || 0}</div>
              <div className="text-purple-200 text-sm">Active Subscriptions</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg border transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple text-white border-purple'
                    : 'border-purple/30 text-purple hover:border-purple/50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Moderation Tab */}
          {activeTab === 'moderation' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple">Flagged Content</h2>
              
              {flaggedContent.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-grey mb-2">No flagged content</h3>
                  <p className="text-grey">All content is currently approved!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {flaggedContent.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gradient-to-br from-red-900/30 to-black/50 p-6 rounded-lg border border-red/20"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{item.title}</h3>
                          <p className="text-red-200 text-sm">
                            Flagged by AI • Confidence: {(item.confidence * 100).toFixed(0)}%
                          </p>
                        </div>
                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                          {item.flag_reasons?.join(', ') || 'Flagged'}
                        </span>
                      </div>
                      
                      <p className="text-grey mb-4 line-clamp-3">{item.content}</p>
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleModerateContent(item.id, 'approve')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleModerateContent(item.id, 'reject')}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleModerateContent(item.id, 'flag')}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors"
                        >
                          Flag for Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab !== 'moderation' && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-bold text-grey mb-2">Coming Soon</h3>
              <p className="text-grey">This section is under development</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

// Disable static generation for this page since it requires authentication
export async function getServerSideProps() {
  return {
    props: {}
  };
}
