import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '../src/lib/hooks/useAuth';

export default function GigsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('jobs');
  const [filter, setFilter] = useState('all');

  const jobListings = [
    {
      id: 1,
      title: "Manga Illustrator Needed",
      type: "Paid Contract",
      budget: "$500 - $1000",
      deadline: "2023-12-01",
      description: "Looking for an artist to illustrate a 20-page one-shot. Style should be similar to Jujutsu Kaisen or Bleach.",
      tags: ["Illustration", "Manga", "Character Design"],
      author: "Studio Eclipse",
      applicants: 12
    },
    {
      id: 2,
      title: "AMV Editor for YouTube Channel",
      type: "Recurring",
      budget: "$50 - $100 per video",
      deadline: "Open",
      description: "Seeking a skilled editor for weekly AMV uploads. Must be proficient in After Effects and have a good sense of rhythm.",
      tags: ["Video Editing", "AMV", "VFX"],
      author: "AnimeHype TV",
      applicants: 45
    },
    {
      id: 3,
      title: "Voice Actor - Male Protagonist",
      type: "Project Based",
      budget: "$200",
      deadline: "2023-11-25",
      description: "Need a voice actor for a fan animation project. Character is a hot-headed shonen protagonist. Deep voice preferred.",
      tags: ["Voice Acting", "Audio", "Dubbing"],
      author: "RedLine Animation",
      applicants: 8
    },
    {
      id: 4,
      title: "Theory Writer / Scriptwriter",
      type: "Collaboration",
      budget: "Revenue Share",
      deadline: "Open",
      description: "Join our team of theory crafters. We need someone to research and write scripts for deep-dive analysis videos.",
      tags: ["Writing", "Research", "Scripting"],
      author: "TheoryCraft",
      applicants: 3
    },
    {
      id: 5,
      title: "Unity Dev for Fan Game",
      type: "Hobby / Portfolio",
      budget: "Unpaid",
      deadline: "Open",
      description: "Building a 2D fighting game based on obscure shonen series. Need a programmer familiar with Unity and hitboxes.",
      tags: ["Game Dev", "Unity", "Programming"],
      author: "IndieFighters",
      applicants: 15
    }
  ];

  const communityProjects = [
    {
      id: 101,
      title: "Project: SHONEN ALL-STARS",
      role: "Animator",
      status: "In Progress",
      description: "A massive collaborative animation project featuring characters from 50+ series.",
      members: 24,
      needed: ["Background Artist", "Sound Designer"]
    },
    {
      id: 102,
      title: "Zine: Villains Only",
      role: "Artist / Writer",
      status: "Recruiting",
      description: "A digital fanzine dedicated to the best antagonists in anime history. Proceeds go to charity.",
      members: 15,
      needed: ["Illustrator", "Layout Designer"]
    }
  ];

  return (
    <>
      <Head>
        <title>Gigs & Projects - Shonen Ark</title>
      </Head>

      <div className="min-h-screen py-20 bg-void-black text-ash-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-purple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 electric-text">
              QUEST BOARD
            </h1>
            <p className="text-xl text-steel-gray max-w-2xl mx-auto">
              Find paid work, join collaborative projects, and build your portfolio.
              The guild awaits.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-shadow-dark border border-white/10 p-1 rounded-xl inline-flex">
              {['jobs', 'projects'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-lg font-bold transition-all ${activeTab === tab
                      ? 'bg-electric-purple text-white shadow-lg shadow-electric-purple/25'
                      : 'text-steel-gray hover:text-white hover:bg-white/5'
                    }`}
                >
                  {tab === 'jobs' ? 'Paid Gigs' : 'Community Projects'}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'jobs' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6"
            >
              {jobListings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-shadow-dark border border-white/5 hover:border-electric-purple/50 rounded-xl p-6 md:p-8 transition-all hover:shadow-glow group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl">📜</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="px-3 py-1 bg-electric-purple/10 text-electric-purple border border-electric-purple/20 rounded-full text-xs font-bold uppercase tracking-wider">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                          {job.budget}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-electric-purple transition-colors">
                        {job.title}
                      </h3>

                      <p className="text-steel-gray mb-6 max-w-3xl">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span key={tag} className="text-xs font-bold text-steel-gray bg-void-black px-3 py-1 rounded-md border border-white/5">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 min-w-[150px]">
                      <div className="text-right">
                        <div className="text-sm text-steel-gray">Posted by</div>
                        <div className="font-bold text-white">{job.author}</div>
                      </div>

                      <button className="power-button w-full md:w-auto text-sm py-2 px-6">
                        Apply Now
                      </button>

                      <div className="text-xs text-steel-gray">
                        {job.applicants} applicants
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6"
            >
              {communityProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-shadow-dark border border-white/5 hover:border-blue-500/50 rounded-xl p-6 md:p-8 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl">🤝</span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                          {project.status}
                        </span>
                        <span className="px-3 py-1 bg-white/5 text-white border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                          {project.members} Members
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-steel-gray mb-6 max-w-3xl">
                        {project.description}
                      </p>

                      <div className="bg-void-black/50 p-4 rounded-lg border border-white/5">
                        <span className="text-xs font-bold text-steel-gray uppercase block mb-2">Looking For:</span>
                        <div className="flex flex-wrap gap-2">
                          {project.needed.map((role) => (
                            <span key={role} className="text-xs font-bold text-blue-300 bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4 min-w-[150px]">
                      <button className="px-6 py-3 bg-white/5 hover:bg-blue-600 text-white font-bold rounded-lg border border-white/10 hover:border-blue-600 transition-all w-full md:w-auto">
                        Join Project
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Marketplace Teaser */}
          <motion.div
            className="mt-20 p-12 rounded-2xl bg-gradient-to-r from-midnight-purple to-void-black border border-electric-purple/30 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-4xl font-display font-bold mb-4 text-white">MARKETPLACE COMING SOON</h2>
              <p className="text-xl text-steel-gray mb-8 max-w-2xl mx-auto">
                Sell your art, presets, and assets directly to the community.
                Secure payments. Instant delivery.
              </p>
              <div className="flex justify-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email for early access"
                  className="px-6 py-3 rounded-lg bg-black/50 border border-white/10 text-white focus:border-electric-purple focus:outline-none w-full max-w-sm"
                />
                <button className="power-button">Notify Me</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
