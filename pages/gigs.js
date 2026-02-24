'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Briefcase, DollarSign, MapPin, Tag, Clock, Plus } from 'lucide-react';

export default function GigsPage() {
  const [gigs, setGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch('/api/gigs');
        const data = await res.json();
        setGigs(data.gigs || [
          {
            id: 1,
            title: 'Manga Colorist Needed',
            company: 'Shonen Jump+',
            location: 'Remote',
            salary: '$30-50/hr',
            tags: ['Coloring', 'Photoshop'],
            posted: '2h ago'
          },
          {
            id: 2,
            title: 'Anime Script Writer',
            company: 'Nexus Studio',
            location: 'Tokyo/Remote',
            salary: '$5000/ep',
            tags: ['Writing', 'World Building'],
            posted: '1d ago'
          }
        ]);
      } catch (err) {
        console.error('Failed to load gigs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGigs();
  }, []);

  return (
    <>
      <Head>
        <title>Gigs - Shonen Ark</title>
        <meta name="description" content="Find work opportunities in the anime and manga industry." />
      </Head>

      <PageLayout>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">Gig Marketplace</h1>
              <p className="text-text-secondary">Work opportunities for creators and industry professionals</p>
            </div>
            <Button size="lg" className="flex items-center gap-2">
              <Plus size={20} /> Post a Gig
            </Button>
          </div>

          <div className="grid xl:grid-cols-2 gap-6">
            {isLoading ? (
              [1, 2, 3, 4].map(i => (
                <Card key={i} className="animate-pulse">
                  <div className="h-6 bg-dark-border rounded w-1/2 mb-4" />
                  <div className="h-4 bg-dark-border rounded w-full mb-2" />
                  <div className="h-4 bg-dark-border rounded w-full mb-4" />
                  <div className="h-10 bg-dark-border rounded w-32" />
                </Card>
              ))
            ) : (
              gigs.map((gig) => (
                <motion.div key={gig.id} whileHover={{ y: -4 }}>
                  <Card className="p-0 overflow-hidden h-full flex flex-col">
                    <CardHeader className="bg-dark-bg p-6 border-b border-dark-border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold mb-1 hover:text-brand-primary cursor-pointer transition-colors">{gig.title}</h2>
                          <p className="text-brand-primary font-medium">{gig.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-lg border border-success/20">
                          Active
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 flex-1">
                      <div className="flex flex-wrap gap-4 mb-6">
                        <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                          <MapPin size={16} className="text-text-muted" /> {gig.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                          <DollarSign size={16} className="text-text-muted" /> {gig.salary}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                          <Clock size={16} className="text-text-muted" /> {gig.posted}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {gig.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-dark-bg border border-dark-border rounded-lg text-xs text-text-secondary">
                            <Tag size={12} /> {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 bg-dark-bg border-t border-dark-border flex items-center justify-between">
                      <Button variant="ghost" size="sm">Save Job</Button>
                      <Button size="sm">Apply Now</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </PageLayout>
    </>
  );
}
