import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service - Shonen Ark</title>
        <meta name="description" content="Terms of Service and usage guidelines for Shonen Ark platform." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white">
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-b from-purple-900 to-black py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-8xl mb-6">📜</div>
              <h1 className="text-5xl font-bold mystical-title mb-4">
                Terms of Service
              </h1>
              <p className="text-xl text-purple-200 brush-font max-w-2xl mx-auto">
                Guidelines for using the Shonen Ark platform
              </p>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div 
            className="prose prose-invert prose-purple max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-dark-purple/20 p-8 rounded-xl border border-purple/30">
              <h2 className="text-2xl font-bold text-purple mb-6">1. Platform Usage</h2>
              <p className="text-grey mb-4">
                Shonen Ark is a community platform for anime enthusiasts to share theories, 
                fan creations, and engage in discussions. By using our platform, you agree to:
              </p>
              <ul className="list-disc list-inside text-grey space-y-2 mb-6">
                <li>Respect copyright and intellectual property rights</li>
                <li>Maintain respectful communication with other users</li>
                <li>Only upload content you have rights to share</li>
                <li>Follow community guidelines and platform rules</li>
              </ul>

              <h2 className="text-2xl font-bold text-purple mb-6">2. Content Guidelines</h2>
              <p className="text-grey mb-4">
                All content shared on Shonen Ark must be:
              </p>
              <ul className="list-disc list-inside text-grey space-y-2 mb-6">
                <li>Appropriate for general audiences</li>
                <li>Related to anime, manga, or Japanese pop culture</li>
                <li>Original work or properly attributed fair use</li>
                <li>Free from hate speech, harassment, or harmful content</li>
              </ul>

              <h2 className="text-2xl font-bold text-purple mb-6">3. Creator Accounts</h2>
              <p className="text-grey mb-4">
                Creator accounts ($4/month) provide additional features and responsibilities:
              </p>
              <ul className="list-disc list-inside text-grey space-y-2 mb-6">
                <li>Upload theories, animations, audio content, and artwork</li>
                <li>Access to creator dashboard and analytics</li>
                <li>Monetization opportunities through community support</li>
                <li>Enhanced visibility and promotional features</li>
              </ul>

              <h2 className="text-2xl font-bold text-purple mb-6">4. Privacy & Data</h2>
              <p className="text-grey mb-4">
                We respect your privacy and handle data responsibly:
              </p>
              <ul className="list-disc list-inside text-grey space-y-2 mb-6">
                <li>Account information is kept secure and private</li>
                <li>Content analytics help improve the platform</li>
                <li>No personal data is sold to third parties</li>
                <li>Users can request data deletion at any time</li>
              </ul>

              <h2 className="text-2xl font-bold text-purple mb-6">5. Community Standards</h2>
              <p className="text-grey mb-4">
                Shonen Ark promotes a positive community environment:
              </p>
              <ul className="list-disc list-inside text-grey space-y-2 mb-6">
                <li>Constructive criticism and healthy debate are encouraged</li>
                <li>Personal attacks and harassment will result in account suspension</li>
                <li>Spam, self-promotion, and off-topic content may be removed</li>
                <li>Community moderators help maintain platform quality</li>
              </ul>

              <div className="bg-purple/10 border border-purple/30 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold text-purple mb-4">Contact Us</h3>
                <p className="text-grey mb-4">
                  Questions about these terms? Need to report a violation? Contact our team:
                </p>
                <div className="space-y-2">
                  <p className="text-white">📧 <strong>Email:</strong> legal@shonenark.com</p>
                  <p className="text-white">💬 <strong>Discord:</strong> discord.gg/shonenark</p>
                  <p className="text-white">📱 <strong>Support:</strong> support@shonenark.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-grey mb-6">
              Last updated: July 15, 2025
            </p>
            <Link 
              href="/" 
              className="inline-block bg-purple hover:bg-dark-purple text-white px-8 py-3 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
