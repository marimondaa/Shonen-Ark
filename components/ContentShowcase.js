import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const ContentShowcase = () => {
  const [activeTab, setActiveTab] = useState('theories');

  const tabs = [
    {
      id: 'theories',
      label: 'Theories',
      icon: '🔮',
      items: [
        {
          title: "The Hidden Connection: One Piece & Dragon Ball",
          author: "InkSage",
          views: "12.4k",
          image: "/images/anime/theory-1.jpg",
          tags: ["One Piece", "Dragon Ball"]
        },
        {
          title: "Naruto's Secret Bloodline Theory",
          author: "ShadowScroll",
          views: "8.7k",
          image: "/images/anime/theory-2.jpg",
          tags: ["Naruto", "Bloodline"]
        },
        {
          title: "Attack on Titan: The Final Truth",
          author: "TitanHunter",
          views: "15.2k",
          image: "/images/anime/theory-3.jpg",
          tags: ["Attack on Titan", "Ending"]
        }
      ]
    },
    {
      id: 'animations',
      label: 'Animations',
      icon: '🎬',
      items: [
        {
          title: "Jujutsu Kaisen Fight Scene Breakdown",
          author: "AnimeMaster",
          views: "25.1k",
          image: "/images/anime/animation-1.jpg",
          tags: ["Jujutsu Kaisen", "Sakuga"]
        },
        {
          title: "Demon Slayer: Water Breathing Analysis",
          author: "FlowMotion",
          views: "18.3k",
          image: "/images/anime/animation-2.jpg",
          tags: ["Demon Slayer", "Animation"]
        },
        {
          title: "My Hero Academia: Quirk Visualization",
          author: "HeroVFX",
          views: "22.8k",
          image: "/images/anime/animation-3.jpg",
          tags: ["My Hero Academia", "VFX"]
        }
      ]
    },
    {
      id: 'creators',
      label: 'Creators',
      icon: '👥',
      items: [
        {
          title: "Creator Spotlight: InkMaster",
          author: "Shonen Ark",
          views: "9.4k",
          image: "/images/avatars/creator-1.jpg",
          tags: ["Spotlight", "Artist"]
        },
        {
          title: "Rising Star: NinjaPen",
          author: "Community",
          views: "6.2k",
          image: "/images/avatars/creator-2.jpg",
          tags: ["New Creator", "Writer"]
        },
        {
          title: "Master Series: SageBrush",
          author: "Featured",
          views: "11.7k",
          image: "/images/avatars/creator-3.jpg",
          tags: ["Master", "Mentor"]
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-ink-black via-sumi-gray/50 to-ink-black ukiyo-overlay">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-forest-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-glow/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-mystical text-parchment mb-6 ink-brush-edge">
            Discover <span className="text-violet-glow">Mystical</span> Content
          </h2>
          <p className="text-stone-wash font-mono text-lg max-w-2xl mx-auto leading-relaxed">
            Explore fan theories, animation breakdowns, and creator spotlights that dive deep into the shonen universe
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12"
        >
          <div className="bg-sumi-gray/80 rounded-2xl p-2 border border-line-highlight/30">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  variants={tabVariants}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-xl font-mono text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-forest-accent text-parchment shadow-lg'
                      : 'text-stone-wash hover:text-violet-glow hover:bg-sumi-gray/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-forest-accent rounded-xl shrine-glow"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          key={activeTab}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {tabs.find(tab => tab.id === activeTab)?.items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="bg-sumi-gray/80 rounded-2xl overflow-hidden border border-line-highlight/20 group-hover:border-violet-glow/50 transition-all duration-300">
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-forest-accent/20 to-violet-glow/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-forest-accent/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">
                        {activeTab === 'theories' ? '🔮' : activeTab === 'animations' ? '🎬' : '👥'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-ink-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      className="bg-violet-glow text-ink-black px-4 py-2 rounded-lg font-mono text-sm font-bold"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                    >
                      View Content
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-parchment font-mystical text-lg mb-2 line-clamp-2 group-hover:text-violet-glow transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-wash font-mono text-sm">by {item.author}</span>
                    <span className="text-violet-glow font-mono text-sm">{item.views} views</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-forest-accent/20 text-forest-accent px-2 py-1 rounded-md font-mono text-xs border border-forest-accent/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <Link href={`/${activeTab}`}>
            <motion.button
              className="bg-gradient-to-r from-forest-accent to-violet-glow text-ink-black px-8 py-4 rounded-xl font-mono font-bold text-lg cinematic-reveal shrine-glow"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(108, 92, 231, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Explore All {tabs.find(tab => tab.id === activeTab)?.label}
              <span className="ml-2">→</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Floating Ink Particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-violet-glow/50 rounded-full"
            style={{
              left: `${10 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default ContentShowcase;
