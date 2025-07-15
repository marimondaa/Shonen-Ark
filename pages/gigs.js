import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function GigsPage() {
  const { data: session, status } = useSession();
  const [isEarlyAccess, setIsEarlyAccess] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [communityProjects, setCommunityProjects] = useState([]);

  useEffect(() => {
    // Load featured gigs data
    const loadGigsData = async () => {
      try {
        // Mock data for featured jobs
        setFeaturedJobs([
          {
            id: 1,
            title: "Voice Actor Needed for Fan Dub",
            type: "voice-acting",
            budget: "$50-100",
            deadline: "2025-02-15",
            poster: "AnimeDubber99",
            description: "Looking for English voice actor for main character in One Piece fan dub project.",
            tags: ["voice-acting", "one-piece", "fan-dub"],
            applications: 12
          },
          {
            id: 2,
            title: "Background Music for AMV",
            type: "music",
            budget: "$25-50",
            deadline: "2025-02-01",
            poster: "AMVCreator",
            description: "Need original background track for Demon Slayer AMV. Epic/orchestral style preferred.",
            tags: ["music", "amv", "demon-slayer"],
            applications: 8
          },
          {
            id: 3,
            title: "Character Design for Original Manga",
            type: "design",
            budget: "$100-200",
            deadline: "2025-02-20",
            poster: "MangaCreator23",
            description: "Need character designer for new shonen manga project. Must understand anime art style.",
            tags: ["character-design", "manga", "original"],
            applications: 25
          }
        ]);

        setCommunityProjects([
          {
            id: 1,
            title: "Attack on Titan Final Season Fan Animation",
            type: "collaboration",
            participants: 15,
            organizer: "TitanAnimator",
            description: "Community project recreating key scenes from the manga. All skill levels welcome!",
            tags: ["animation", "attack-on-titan", "community"],
            status: "open"
          },
          {
            id: 2,
            title: "One Piece AMV Collaboration",
            type: "collaboration",
            participants: 8,
            organizer: "StrawHatEditor",
            description: "Group AMV project celebrating 25 years of One Piece. Looking for editors and motion designers.",
            tags: ["amv", "one-piece", "editing"],
            status: "recruiting"
          }
        ]);
      } catch (error) {
        console.error('Failed to load gigs data:', error);
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
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-b from-purple-900 to-black py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="text-8xl mb-6">💼</div>
              <h1 className="text-5xl font-bold mb-6 mystical-title glow-text">
                Gigs & Community Work
              </h1>
              <p className="text-xl text-purple-200 mb-8 brush-font">
                Connect with fellow creators and find opportunities in the anime community
              </p>
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
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-purple text-white border-purple shadow-lg shadow-purple/25'
                    : 'border-purple/30 text-purple hover:border-purple/50 hover:bg-purple/10'
                }`}
              >
                <span className="text-xl mr-2">{tab.icon}</span>
                {tab.label}
              </button>
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
                <h2 className="text-3xl font-bold mb-4 text-purple">Job Board</h2>
                <p className="text-grey max-w-2xl mx-auto">
                  Find paid opportunities to work on anime-related projects with creators around the world.
                </p>
              </div>

              <div className="grid gap-6 mb-8">
                {featuredJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    className="bg-gradient-to-br from-purple-900/30 to-black/50 p-6 rounded-lg border border-purple/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      <span className="bg-purple text-white px-3 py-1 rounded-full text-sm">
                        {job.budget}
                      </span>
                    </div>
                    <p className="text-grey mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-dark-purple/50 text-purple-200 px-2 py-1 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-grey">By {job.poster}</span>
                      <span className="text-purple">{job.applications} applications</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {session?.user ? (
                <div className="text-center">
                  <Link href="/account/creator">
                    <button className="bg-purple hover:bg-dark-purple text-white px-8 py-3 rounded-lg transition-colors">
                      Post a Job ($10 fee)
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-grey mb-4">Sign in to post jobs and apply to opportunities</p>
                  <Link href="/login">
                    <button className="bg-purple hover:bg-dark-purple text-white px-8 py-3 rounded-lg transition-colors">
                      Sign In to Get Started
                    </button>
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
                <h2 className="text-3xl font-bold mb-4 text-purple">Community Projects</h2>
                <p className="text-grey max-w-2xl mx-auto">
                  Collaborate on passion projects for the love of anime and community recognition.
                </p>
              </div>

              <div className="grid gap-6">
                {communityProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-gradient-to-br from-purple-900/30 to-black/50 p-6 rounded-lg border border-purple/20"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-grey mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-dark-purple/50 text-purple-200 px-2 py-1 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-grey">Led by {project.organizer}</span>
                      <span className="text-purple">{project.participants} participants</span>
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
