import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../src/lib/hooks/useAuth';

export default function GigsPage() {
  const { user, isAuthenticated } = useAuth();
  const [isEarlyAccess, setIsEarlyAccess] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [communityProjects, setCommunityProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load featured gigs data from API
    const loadGigsData = async () => {
      try {
        setIsLoading(true);

        if (activeTab === 'jobs') {
          const response = await fetch('/api/gigs?limit=10');
          const data = await response.json();

          if (response.ok) {
            setFeaturedJobs(data.gigs || []);
          } else {
            // Fallback to mock data if API fails
            setFeaturedJobs([
              {
                id: 1,
                title: "Video Editor for AMV Channel",
                budget: "$200 - $500",
                deadline: "2 weeks",
                description: "Looking for an experienced editor to create high-energy AMVs using After Effects. Must be familiar with flow editing and typography.",
                tags: ["Video Editing", "After Effects", "AMV"],
                applications: 12
              },
              {
                id: 2,
                title: "Thumbnail Artist for Theory Channel",
                budget: "$50 - $100 per thumbnail",
                deadline: "Ongoing",
                description: "Need click-worthy thumbnails for a One Piece theory channel. Style should be vibrant and high contrast.",
                tags: ["Graphic Design", "Photoshop", "YouTube"],
                applications: 45
              },
              {
                id: 3,
                title: "Scriptwriter for Anime Analysis",
                budget: "$0.10 per word",
                deadline: "1 week",
                description: "Seeking a writer with deep knowledge of JJK and Chainsaw Man for deep-dive analysis scripts.",
                tags: ["Writing", "Scripting", "Analysis"],
                applications: 8
              }
            ]);
          }
        }

        if (activeTab === 'community') {
          const response = await fetch('/api/community-projects?limit=10');
          const data = await response.json();

          if (response.ok) {
            setCommunityProjects(data.projects || []);
          } else {
            // Fallback to mock data if API fails
            setCommunityProjects([
              {
                id: 1,
                title: "Shonen Ark Community Manga",
                status: "Recruiting",
                organizer: "ArkAdmin",
                description: "A collaborative manga project created by the community. Looking for artists, writers, and letterers.",
                participants: 24,
                roles: ["Artist", "Writer", "Letterer"]
              },
              {
                id: 2,
                title: "Fan Animation Collab 2024",
                status: "In Progress",
                organizer: "StudioArk",
                description: "Multi-animator project focusing on the best fights of 2024. Join the discord to participate.",
                participants: 156,
                roles: ["Animator", "Background Artist"]
              }
            ]);
          }
        }
      } catch (error) {
        console.error('Failed to load gigs data:', error);
        // Set mock data as fallback
        setFeaturedJobs([]);
        setCommunityProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadGigsData();
  }, [activeTab]);

  const handleEarlyAccessSignup = async (email) => {
    // Here you would typically save to your backend
    console.log('Early access signup:', email);
    setIsEarlyAccess(true);
  };

  const tabs = [
    { id: 'jobs', label: 'Job Board', icon: '💼' },
    { id: 'community', label: 'Community Projects', icon: '🤝' },
    { id: 'marketplace', label: 'Services', icon: '🛒' }
  ];

  return (
    <>
      <Head>
        <title>Gigs & Community Work - Shonen Ark</title>
        <meta name="description" content="Find work opportunities and collaborate on anime projects with the Shonen Ark community" />
      </Head>

      <div className="min-h-screen transition-colors dark:bg-black dark:text-white">
        {/* Hero Section with Brand Logo */}
        <motion.div
          className="dark:bg-gradient-to-b dark:from-black dark:via-dark-purple/20 dark:to-black py-24 relative overflow-hidden transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtle particle effect */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Brand Logo */}
              <motion.div className="mb-6 flex justify-center">
                <motion.img
                  src="/brand-logo.png"
                  alt="Shonen Ark"
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6 mystical-title">
                <span className="text-transparent bg-gradient-to-r from-purple via-white to-purple bg-clip-text">
                  Gigs & Community Work
                </span>
              </h1>

              <motion.p
                className="text-lg sm:text-xl text-grey mb-8 font-mystical max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Connect with fellow creators and find opportunities in the anime community
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            className="flex justify-center space-x-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg border transition-all duration-300 font-mystical ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple/20 to-dark-purple/20 text-white border-purple'
                    : 'border-purple/30 text-purple hover:border-purple/50 hover:bg-purple/10'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg mr-2">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Content Sections */}
          {activeTab === 'jobs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 mystical-title">
                  <span className="text-transparent bg-gradient-to-r from-purple via-white to-purple bg-clip-text">
                    Job Board
                  </span>
                </h2>
                <p className="text-grey max-w-2xl mx-auto font-mystical">
                  Find paid opportunities to work on anime-related projects with creators around the world.
                </p>
              </div>

              <div className="grid gap-6 mb-8">
                {isLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <motion.div
                      className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                ) : featuredJobs.length > 0 ? (
                  featuredJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      className="bg-gradient-to-br from-dark-purple/30 to-black/50 p-6 rounded-lg border border-purple/20 hover:border-purple/40 transition-all duration-300 shrine-glow"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white mystical-title">{job.title}</h3>
                        <span className="bg-gradient-to-r from-purple to-dark-purple text-white px-3 py-1 rounded-full text-sm font-mystical">
                          {job.budget}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags && job.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-purple/10 text-purple px-2 py-1 rounded border border-purple/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-grey mb-6 line-clamp-2 font-mystical">{job.description}</p>

                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-sm text-grey">
                          Deadline: {job.deadline}
                        </span>
                        <motion.button
                          className="px-4 py-2 bg-purple text-white rounded hover:bg-dark-purple transition-colors font-mystical"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Apply Now
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 text-grey font-mystical">
                    No jobs found at the moment. Check back later!
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 mystical-title">
                  <span className="text-transparent bg-gradient-to-r from-purple via-white to-purple bg-clip-text">
                    Community Projects
                  </span>
                </h2>
                <p className="text-grey max-w-2xl mx-auto font-mystical">
                  Collaborate with other fans on massive projects.
                </p>
              </div>

              <div className="grid gap-6 mb-8">
                {isLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <motion.div
                      className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                ) : communityProjects.length > 0 ? (
                  communityProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="bg-gradient-to-br from-dark-purple/30 to-black/50 p-6 rounded-lg border border-purple/20 hover:border-purple/40 transition-all duration-300 shrine-glow"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white mystical-title">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-mystical ${project.status === 'Recruiting' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                          {project.status}
                        </span>
                      </div>

                      <p className="text-grey mb-6 font-mystical">{project.description}</p>

                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-grey">
                            Organizer: <span className="text-purple">{project.organizer}</span>
                          </span>
                          <span className="text-sm text-grey">
                            Participants: {project.participants}
                          </span>
                        </div>
                        <motion.button
                          className="px-4 py-2 border border-purple text-purple rounded hover:bg-purple/10 transition-colors font-mystical"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 text-grey font-mystical">
                    No community projects found. Start one today!
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'marketplace' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="max-w-2xl mx-auto bg-gradient-to-br from-dark-purple/30 to-black/50 p-8 rounded-xl border border-purple/20">
                <h2 className="text-3xl font-bold mb-4 mystical-title">
                  <span className="text-transparent bg-gradient-to-r from-purple via-white to-purple bg-clip-text">
                    Marketplace Coming Soon
                  </span>
                </h2>
                <p className="text-grey mb-8 font-mystical">
                  We're building a dedicated marketplace for creators to sell their services directly.
                  Sign up for early access to be the first to know when we launch.
                </p>

                {!isEarlyAccess ? (
                  <div className="flex max-w-md mx-auto gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 bg-black/50 border border-purple/30 rounded px-4 py-2 text-white focus:outline-none focus:border-purple"
                    />
                    <motion.button
                      onClick={() => handleEarlyAccessSignup('test@example.com')}
                      className="px-6 py-2 bg-purple text-white rounded font-bold hover:bg-dark-purple transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Notify Me
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/20 border border-green-500/40 text-green-400 px-6 py-4 rounded-lg inline-block"
                  >
                    Thanks! We'll be in touch soon.
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
