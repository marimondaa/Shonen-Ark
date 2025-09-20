import { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      // Simulate Stripe checkout process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, redirect to Stripe checkout
      console.log('Redirecting to Stripe checkout...');
      
      // After successful payment, redirect to creator dashboard
      router.push('/account/creator?welcome=true');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'Upload unlimited theories and articles',
    'Video and animation uploads (up to 100MB)',
    'Audio content and soundscapes',
    'Character design showcases',
    'Creator analytics dashboard',
    'Priority support'
  ];

  return (
    <>
      <Head>
        <title>Become a Creator - Shonen Ark</title>
        <meta name="description" content="Unlock creator tools and start sharing your anime content with the community." />
      </Head>

  <div className="min-h-screen dark:bg-black dark:text-white transition-colors">
        <motion.header 
          className="dark:bg-gradient-to-r dark:from-dark-purple/80 dark:to-purple/80 py-20 transition-colors"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-8xl mb-6">⭐</div>
            <h1 className="text-5xl font-bold mystical-title mb-6">Become a Creator</h1>
            <p className="text-xl text-grey brush-font max-w-2xl mx-auto">
              Join our community of anime content creators and share your theories, animations, and audio content.
            </p>
          </div>
        </motion.header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <motion.div 
              className="bg-dark-purple/30 rounded-2xl p-8 border-2 border-purple/50 shrine-glow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold mystical-title mb-2 text-purple">Creator Plan</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  $4<span className="text-lg text-grey">/month</span>
                </div>
                <p className="text-grey mb-6">Everything you need to create and share</p>
              </div>

              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-5 h-5 bg-purple/20 rounded-full flex items-center justify-center">
                      <span className="text-purple text-sm">✓</span>
                    </div>
                    <span className="text-grey">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="w-full bg-purple hover:bg-purple/80 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div 
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Start Creating Now'
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
