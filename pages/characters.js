'use client';

import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Zap, Shield, Swords } from 'lucide-react';

export default function CharactersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const characters = [
    {
      id: 1,
      name: 'Monkey D. Luffy',
      series: 'One Piece',
      role: 'Protagonist',
      power: 'Sun God Nika',
      image: 'https://images.unsplash.com/photo-1621478373722-158d928373b7?auto=format&fit=crop&q=80&w=400',
      color: 'border-red-500'
    },
    {
      id: 2,
      name: 'Sung Jin-Woo',
      series: 'Solo Leveling',
      role: 'Shadow Monarch',
      power: 'Shadow Extraction',
      image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?auto=format&fit=crop&q=80&w=400',
      color: 'border-purple-500'
    },
    {
      id: 3,
      name: 'Roronoa Zoro',
      series: 'One Piece',
      role: 'Swordsman',
      power: 'Three Sword Style',
      image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=400',
      color: 'border-green-500'
    }
  ];

  const filtered = characters.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.series.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Characters - Shonen Ark</title>
        <meta name="description" content="Anime character database and power rankings." />
      </Head>

      <PageLayout>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">Character Database</h1>
              <p className="text-text-secondary">Profiles, powers, and rankings of your favorite characters</p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3 text-text-muted" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search characters or series..."
                className="pl-10 w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((char) => (
              <motion.div key={char.id} whileHover={{ scale: 1.02 }}>
                <Card className={`p-0 overflow-hidden border-t-4 ${char.color}`}>
                  <div className="aspect-video bg-dark-bg relative">
                    {/* Placeholder for actual image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <h2 className="text-2xl font-display font-bold text-white">{char.name}</h2>
                      <p className="text-brand-primary font-medium">{char.series}</p>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted flex items-center gap-2">
                          <Shield size={16} /> Role
                        </span>
                        <span className="font-semibold">{char.role}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted flex items-center gap-2">
                          <Zap size={16} /> Power
                        </span>
                        <span className="font-semibold">{char.power}</span>
                      </div>
                    </div>

                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                      <Swords size={18} /> View Battle Stats
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </PageLayout>
    </>
  );
}
