import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/auth-context';

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
                title: "Voice Actor Needed for Fan Dub",
                type: "voice-acting",
                budget: "$50-100",
                deadline: "2025-02-15",
                poster: { username: "AnimeDubber99" },
                description: "Looking for English voice actor for main character in One Piece fan dub project.",
                tags: ["voice-acting", "one-piece", "fan-dub"],
                applications_count: 12
              },
              {
                id: 2,
                title: "Background Music for AMV",
                type: "music",
                budget: "$25-50",
                deadline: "2025-02-01",
                poster: { username: "AMVCreator" },
                description: "Need original background track for Demon Slayer AMV. Epic/orchestral style preferred.",
                tags: ["music", "amv", "demon-slayer"],
                applications_count: 8
              },
              {
                id: 3,
                title: "Character Design for Original Manga",
                type: "design",
                budget: "$100-200",
                deadline: "2025-02-20",
                poster: { username: "MangaCreator23" },
                description: "Need character designer for new shonen manga project. Must understand anime art style.",
                tags: ["character-design", "manga", "original"],
                applications_count: 25
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
                title: "Attack on Titan Final Season Fan Animation",
                project_type: "animation",
                current_participants: 15,
                organizer: { username: "TitanAnimator" },
                description: "Community project recreating key scenes from the manga. All skill levels welcome!",
                tags: ["animation", "attack-on-titan", "community"],
                status: "recruiting"
              },
              {
                id: 2,
                title: "One Piece AMV Collaboration",
                project_type: "amv",
                current_participants: 8,
                organizer: { username: "StrawHatEditor" },
                description: "Group AMV project celebrating 25 years of One Piece. Looking for editors and motion designers.",
                tags: ["amv", "one-piece", "editing"],
                status: "recruiting"
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

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section with Brand Logo */}
        <motion.div 
          className="bg-gradient-to-b from-black via-dark-purple/20 to-black py-24 relative overflow-hidden"
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
                className={`px-6 py-3 rounded-lg border transition-all duration-300 font-mystical ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple/20 to-dark-purple/20 text-white border-purple glow-text'
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
                    <p className="text-grey mb-4 leading-relaxed">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-dark-purple/50 text-purple-200 px-2 py-1 rounded text-sm border border-purple/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-grey">By <span className="text-purple">{job.poster?.username || job.poster}</span></span>
                      <span className="text-purple">{job.applications_count || job.applications} applications</span>
                    </div>
                  </motion.div>
                ))
                ) : (
                  <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-6xl mb-4 opacity-50">💼</div>
                    <h3 className="text-xl font-bold text-grey mb-2 mystical-title">No jobs available</h3>
                    <p className="text-grey font-mystical">Check back later for new opportunities!</p>
                  </motion.div>
                )}
              </div>

              {isAuthenticated() ? (
                <div className="text-center">
                  <Link href="/account/creator">
                    <motion.button 
                      className="bg-gradient-to-r from-purple to-dark-purple hover:from-dark-purple hover:to-purple text-white px-8 py-3 rounded-lg transition-all duration-300 font-mystical shrine-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Post a Job ($10 fee)
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-grey mb-4 font-mystical">Sign in to post jobs and apply to opportunities</p>
                  <Link href="/login">
                    <motion.button 
                      className="bg-gradient-to-r from-purple to-dark-purple hover:from-dark-purple hover:to-purple text-white px-8 py-3 rounded-lg transition-all duration-300 font-mystical shrine-glow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign In to Get Started
                    </motion.button>
                  </Link>
                </div>
              )}
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
                  Collaborate on passion projects for the love of anime and community recognition.
                </p>
              </div>

              <div className="grid gap-6">
                {communityProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-gradient-to-br from-dark-purple/30 to-black/50 p-6 rounded-lg border border-purple/20 hover:border-purple/40 transition-all duration-300 shrine-glow"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white mystical-title">{project.title}</h3>
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-mystical">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-grey mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-dark-purple/50 text-purple-200 px-2 py-1 rounded text-sm border border-purple/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-grey">Led by <span className="text-purple">{project.organizer?.username || project.organizer}</span></span>
                      <span className="text-purple">{project.current_participants || project.participants} participants</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'marketplace' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8 text-purple">Coming Soon: Creator Services</h2>
              <div className="bg-gradient-to-br from-purple-900/30 to-black/50 p-8 rounded-lg border border-purple/20 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🛒</div>
                <h3 className="text-xl font-bold mb-4 text-white">Marketplace Features</h3>
                <ul className="text-grey space-y-2 mb-6">
                  <li>• Commission custom artwork and animations</li>
                  <li>• Book voice acting services</li>
                  <li>• Order original music compositions</li>
                  <li>• Secure payment processing</li>
                </ul>
                <p className="text-purple-200">
                  This feature will launch with our Creator Pro tier expansion
                </p>
              </div>
            </motion.div>
          )}

          {/* Early Access CTA - Only show if marketplace tab and not signed up */}
          {activeTab === 'marketplace' && !isEarlyAccess && (
            <motion.div 
              className="bg-gradient-to-r from-purple to-dark-purple p-8 rounded-lg mt-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Get Early Access</h3>
              <p className="text-purple-100 mb-6">
                Be the first to know when the full Gigs marketplace launches
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40"
                />
                <button 
                  onClick={() => setIsEarlyAccess(true)}
                  className="px-8 py-3 bg-white text-purple font-semibold rounded-lg hover:bg-white/90 transition-colors"
                >
                  Notify Me
                </button>
              </div>
            </motion.div>
          )}

          {isEarlyAccess && (
            <motion.div 
              className="text-center mt-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="text-4xl mb-4">✅</div>
              <p className="text-white text-lg font-semibold">You're on the list!</p>
              <p className="text-purple-200">We'll notify you when new features go live</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

// Disable static generation for this page since it requires authentication
export async function getServerSideProps() {
  return {
    props: {}
  };
}
