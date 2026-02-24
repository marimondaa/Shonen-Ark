'use client';

import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Zap, Users, BookOpen, Sparkles } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Theory Crafting',
      description: 'Share your deep-dive analysis and theory posts',
    },
    {
      icon: Users,
      title: 'Creator Network',
      description: 'Connect with other creators and collaborate',
    },
    {
      icon: Zap,
      title: 'Gig Marketplace',
      description: 'Find or post work opportunities',
    },
    {
      icon: Sparkles,
      title: 'Fan Hub',
      description: 'Discover fan content and discussions',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Head>
        <title>Shonen Ark - Anime Fan Theory Hub</title>
        <meta name="description" content="Share anime theories, connect with creators, and discover fan content." />
      </Head>

      <PageLayout>
        {/* Hero Section */}
        <motion.section
          className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Welcome to <span className="text-gradient">Shonen Ark</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-text-secondary max-w-2xl mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            The ultimate hub for anime theories, fan creations, and creator collaboration.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/theories">
              <Button size="lg">Explore Theories</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary" size="lg">Get Started</Button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Why Shonen Ark?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                >
                  <Card hover>
                    <div className="flex flex-col items-center text-center">
                      <div className="p-3 bg-brand-primary/20 rounded-lg mb-4">
                        <Icon size={24} className="text-brand-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-text-secondary text-sm">{feature.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 bg-dark-surface border border-dark-border rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Ready to Share Your Theories?</h2>
            <p className="text-text-secondary max-w-xl mx-auto mb-8">
              Join thousands of anime fans and creators on Shonen Ark today.
            </p>
            <Link href="/register">
              <Button size="lg">Create Account Now</Button>
            </Link>
          </div>
        </motion.section>
      </PageLayout>
    </>
  );
}
