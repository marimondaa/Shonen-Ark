'use client';

import Head from 'next/head';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card, CardHeader, CardContent } from '../components/Card';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

export default function CalendarPage() {
  const events = [
    {
      id: 1,
      title: 'One Piece Chapter 1112 Release',
      date: 'March 24, 2024',
      time: '12:00 PM',
      type: 'Manga Release',
      color: 'bg-brand-primary'
    },
    {
      id: 2,
      title: 'Solo Leveling Episode 12 Premiere',
      date: 'March 28, 2024',
      time: '6:30 PM',
      type: 'Anime Premiere',
      color: 'bg-brand-secondary'
    },
    {
      id: 3,
      title: 'Creator Workshop: Theory Crafting',
      date: 'April 2, 2024',
      time: '8:00 PM',
      type: 'Community Event',
      color: 'bg-brand-accent'
    }
  ];

  return (
    <>
      <Head>
        <title>Calendar - Shonen Ark</title>
        <meta name="description" content="Anime and manga release schedule." />
      </Head>

      <PageLayout>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-2">Release Calendar</h1>
            <p className="text-text-secondary">Stay updated with the latest anime and manga releases</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CalendarIcon className="text-brand-primary" /> Upcoming Events
              </h2>

              {events.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-0 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className={`w-2 sm:w-4 ${event.color} shrink-0`} />
                      <div className="p-6 flex-1">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary mb-1 block">
                              {event.type}
                            </span>
                            <h3 className="text-xl font-bold">{event.title}</h3>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{event.date.split(',')[0]}</p>
                            <p className="text-text-muted text-sm">{event.date.split(',')[1]}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                          <span className="flex items-center gap-1.5">
                            <Clock size={16} /> {event.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={16} /> Online Release
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Monthly Overview</h2>
              <Card>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-text-muted mb-4">
                  <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-10 flex items-center justify-center rounded-lg text-sm border border-dark-border ${[24, 28].includes(i + 1)
                          ? 'bg-brand-primary/20 text-brand-primary border-brand-primary font-bold'
                          : 'hover:bg-dark-surface'
                        }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </Card>

              <Card bg="dark-surface">
                <h3 className="font-bold mb-4">Notification Settings</h3>
                <p className="text-sm text-text-secondary mb-4">Get alerted via email or Discord when new chapters drop.</p>
                <button className="w-full py-2 bg-dark-bg border border-dark-border rounded-lg text-sm font-medium hover:bg-dark-border transition-colors">
                  Configure Alerts
                </button>
              </Card>
            </div>
          </div>
        </motion.div>
      </PageLayout>
    </>
  );
}
