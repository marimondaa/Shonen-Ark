'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Button } from '../components/Button';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Search, Plus, Filter } from 'lucide-react';

export default function TheoriesPage() {
  const [theories, setTheories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTheories = async () => {
      try {
        const res = await fetch('/api/theories');
        const data = await res.json();
        setTheories(data.theories || []);
      } catch (err) {
        console.error('Failed to load theories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheories();
  }, []);

  const filteredTheories = theories.filter(theory => {
    const matchesSearch = theory.title?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || theory.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Head>
        <title>Theories - Shonen Ark</title>
        <meta name="description" content="Explore anime fan theories and deep analysis." />
      </Head>

      <PageLayout>
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">Theories</h1>
              <p className="text-text-secondary">Explore and share anime fan theories</p>
            </div>
            <Link href="/theories/new">
              <Button size="lg" className="flex items-center gap-2">
                <Plus size={20} /> Create Theory
              </Button>
            </Link>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-text-muted" size={18} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search theories..."
                className="pl-10 w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all duration-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-text-muted" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-dark-surface border border-dark-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <option value="all">All Categories</option>
                <option value="one-piece">One Piece</option>
                <option value="naruto">Naruto</option>
                <option value="bleach">Bleach</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Theories Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <div className="h-4 bg-dark-border rounded w-3/4 mb-4" />
                <div className="h-24 bg-dark-border rounded mb-4" />
                <div className="h-4 bg-dark-border rounded w-1/2" />
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredTheories.map((theory) => (
              <Link key={theory.id} href={`/theories/${theory.id}`}>
                <Card hover className="h-full flex flex-col">
                  <CardHeader>
                    <h3 className="text-xl font-bold line-clamp-2">{theory.title}</h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-text-secondary text-sm line-clamp-3 mb-4">
                      {theory.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-text-muted mt-auto">
                      <span>{theory.author}</span>
                      <span>{new Date(theory.created_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {filteredTheories.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-dark-border rounded-xl">
                <Search size={48} className="mx-auto text-text-muted mb-4 opacity-20" />
                <h3 className="text-xl font-semibold text-text-secondary">No theories found</h3>
                <p className="text-text-muted">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        )}
      </PageLayout>
    </>
  );
}
