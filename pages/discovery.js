'use client';

import Head from 'next/head';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Compass, TrendingUp, Star, Globe } from 'lucide-react';

export default function DiscoveryPage() {
  const sections = [
    {
      title: 'Current Trends',
      icon: TrendingUp,
      color: 'text-brand-secondary',
      items: [
        { title: '#MangaTheory', posts: 1240 },
        { title: '#OnePieceSpoilers', posts: 5600 },
        { title: '#SoloLeveling', posts: 3100 },
      ]
    },
    {
      title: 'Top Creators',
      icon: Star,
      color: 'text-brand-accent',
      items: [
        { title: 'Nakama_Theory', followers: '12K' },
        { title: 'AnimeSage', followers: '45K' },
        { title: 'TheoryKing', followers: '8K' },
      ]
    },
    {
      title: 'Global Hubs',
      icon: Globe,
      color: 'text-info',
      items: [
        { title: 'Japanese Community', active: 3400 },
        { title: 'English Community', active: 8900 },
        { title: 'Latam Hub', active: 2100 },
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Discovery - Shonen Ark</title>
        <meta name="description" content="Discover new anime content and creators." />
      </Head>

      <PageLayout>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-2">Discovery</h1>
            <p className="text-text-secondary">Find trending theories, creators, and community hubs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <Card key={idx} className="flex flex-col">
                  <CardHeader className="flex items-center gap-3">
                    <div className={`p-2 bg-dark-bg rounded-lg ${section.color}`}>
                      <Icon size={20} />
                    </div>
                    <h2 className="text-xl font-bold">{section.title}</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-dark-bg rounded-lg border border-dark-border hover:border-brand-primary transition-colors cursor-pointer group">
                        <span className="font-medium group-hover:text-brand-primary transition-colors">{item.title}</span>
                        <span className="text-xs text-text-muted">
                          {item.posts ? `${item.posts} posts` : item.followers ? `${item.followers} fans` : `${item.active} online`}
                        </span>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full mt-2">View All</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Spotlight Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Compass className="text-brand-primary" /> Content Spotlight
            </h2>
            <Card className="bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border-brand-primary/30 p-8">
              <div className="max-w-2xl">
                <span className="px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full mb-4 inline-block uppercase">Featured Theory</span>
                <h3 className="text-3xl font-display font-bold mb-4">The Secret of the Will of D: A New Perspective</h3>
                <p className="text-text-secondary text-lg mb-8">
                  Check out this week&apos;s most viral theory by Nakama_Theory exploring the historical origins of the D clan in One Piece.
                </p>
                <div className="flex gap-4">
                  <Button>Read Analysis</Button>
                  <Button variant="secondary">Follow Creator</Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </PageLayout>
    </>
  );
}
