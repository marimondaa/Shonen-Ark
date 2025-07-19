import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import UploadComponent from '../../src/components/features/UploadComponent';
import { getCreatorStats, getCreatorContent } from '../../src/lib/utils/mockData';
import { withSubscription } from '../../src/lib/middleware/withSubscription';

function CreatorAccount() {
  const { data: session } = useSession() || {};
  const [stats, setStats] = useState({
    subscribers: 0,
    totalViews: 0,
    totalUploads: 0,
    monthlyRevenue: 0
  });
  const [recentUploads, setRecentUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [billingLoading, setBillingLoading] = useState(false);

  useEffect(() => {
    const loadCreatorData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use centralized mock data
        const creatorStats = getCreatorStats();
        const creatorUploads = getCreatorContent();
        
        setStats(creatorStats);
        setRecentUploads(creatorUploads);
      } catch (error) {
        console.error('Failed to load creator data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCreatorData();
  }, []);

  const handleUpload = (files) => {
    console.log('Uploading files:', files);
    // Handle file upload logic here
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Head>
        <title>Creator Studio - Shonen Ark</title>
        <meta name="description" content="Manage your content, track performance, and grow your audience." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
        <motion.header 
          className="bg-gradient-to-r from-purple-900 to-black py-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 shrine-glow rounded-full flex items-center justify-center overflow-hidden"
            >
              <img 
                src="/brand-logo.png" 
                alt="Shonen Ark" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <h1 className="text-4xl font-bold mystical-title mb-4">Creator Studio</h1>
            <p className="text-xl text-purple-200 font-mystical">Manage your content and track your growth</p>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
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
              {/* Stats Grid */}
              <motion.section 
                variants={itemVariants}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mystical-title mb-6 text-purple">Performance Overview</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  {Object.entries(stats).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className="bg-dark-purple/30 rounded-lg p-6 text-center border border-purple/20 hover:border-purple/50 transition-all shrine-glow"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="text-3xl font-bold text-purple mb-2">
                        {key === 'monthlyRevenue' ? `$${value}` : value.toLocaleString()}
                      </div>
                      <div className="text-grey capitalize text-sm">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Content Management */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <motion.section variants={itemVariants}>
                  <h2 className="text-2xl font-bold mystical-title mb-6 text-purple">Upload Content</h2>
                  <div className="bg-dark-purple/30 rounded-lg p-6 border border-purple/20">
                    <div className="mb-6">
                      <label htmlFor="content-type" className="block text-sm font-medium text-grey mb-2">
                        Content Type
                      </label>
                      <select
                        id="content-type"
                        className="w-full bg-black border border-purple/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple"
                      >
                        <option value="theory">Theory Article</option>
                        <option value="animation">Animation Video</option>
                        <option value="audio">Audio/Music</option>
                        <option value="design">Character Design</option>
                      </select>
                    </div>
                    
                    <UploadComponent onUpload={handleUpload} />
                  </div>
                </motion.section>

                {/* Recent Uploads */}
                <motion.section variants={itemVariants}>
                  <h2 className="text-2xl font-bold mystical-title mb-6 text-purple">Recent Uploads</h2>
                  <div className="space-y-4">
                    {recentUploads.map((upload) => (
                      <motion.article
                        key={upload.id}
                        className="bg-dark-purple/30 rounded-lg p-4 border border-purple/20 hover:border-purple/50 transition-all"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-white">{upload.title}</h3>
                              <span className="text-xs px-2 py-1 rounded bg-purple/20 text-purple">
                                {upload.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-grey">
                              <span>👁️ {upload.views}</span>
                              <span>👍 {upload.likes}</span>
                              <span>📅 {upload.uploadDate}</span>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                            {upload.status}
                          </span>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </motion.section>
              </div>

              {/* Billing Section */}
              <motion.section 
                variants={itemVariants}
                className="mt-12"
              >
                <h2 className="text-2xl font-bold mystical-title mb-6 text-purple">Subscription & Billing</h2>
                <div className="bg-dark-purple/30 rounded-lg p-6 border border-purple/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Creator Subscription</h3>
                      <p className="text-grey">Manage your subscription, payment methods, and billing history</p>
                    </div>
                    <motion.button
                      onClick={handleBillingPortal}
                      disabled={billingLoading}
                      className="bg-purple hover:bg-dark-purple disabled:bg-grey text-white px-6 py-3 rounded-lg transition-colors font-medium"
                      whileHover={!billingLoading ? { scale: 1.05 } : {}}
                      whileTap={!billingLoading ? { scale: 0.95 } : {}}
                    >
                      {billingLoading ? (
                        <div className="flex items-center">
                          <motion.div 
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Loading...
                        </div>
                      ) : (
                        'Manage Billing'
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default withSubscription(CreatorAccount, 'creator');

// Disable static generation for this page since it requires authentication
export async function getServerSideProps() {
  return {
    props: {}
  };
}
