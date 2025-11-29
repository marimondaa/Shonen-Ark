import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import UploadComponent from '../src/components/features/UploadComponent';
import Image from 'next/image';

export default function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uploads, setUploads] = useState([]);

  const categories = [
    {
      id: 'fan-fights',
      title: 'Fan Fights',
      description: 'Upload and watch epic fan-made fight scenes and animations',
      icon: '⚔️',
      color: 'from-red-600 to-orange-500',
      acceptedTypes: 'video/*',
      maxSize: 100
    },
    {
      id: 'audio-fx',
      title: 'Audio FX',
      description: 'Share and discover amazing sound effects and music tracks',
      icon: '🎵',
      color: 'from-purple-600 to-pink-500',
      acceptedTypes: 'audio/*',
      maxSize: 50
    },
    {
      id: 'character-designs',
      title: 'Character Designs',
      description: 'Showcase your original character artwork and designs',
      icon: '🎨',
      color: 'from-blue-600 to-cyan-500',
      acceptedTypes: 'image/*',
      maxSize: 10
    }
  ];

  const handleUpload = (file, category) => {
    const newUpload = {
      id: Date.now(),
      file,
      category,
      preview: URL.createObjectURL(file),
      timestamp: new Date().toLocaleString()
    };
    setUploads(prev => [newUpload, ...prev]);
  };

  return (
    <div className="min-h-screen py-20 bg-void-black text-ash-white transition-colors relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-electric-purple/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 electric-text">
            DISCOVERY FEED
          </h1>
          <p className="text-xl text-steel-gray max-w-2xl mx-auto leading-relaxed">
            Explore fan creations across different categories. Share your own content
            and discover amazing works from the community.
          </p>
        </motion.header>

        {/* Submission CTAs */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/submit-theory" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-midnight-purple to-void-black border border-electric-purple/30 hover:border-electric-purple transition-all p-10 flex flex-col items-center text-center hover:shadow-glow-lg">
            <div className="absolute inset-0 bg-electric-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">📜</span>
            <h3 className="text-3xl font-bold text-white mb-3 font-display tracking-wide">Submit Theory</h3>
            <p className="text-steel-gray mb-8 text-lg">Share your analysis and predictions with the community</p>
            <span className="px-8 py-3 bg-white/5 rounded-full text-white font-bold group-hover:bg-electric-purple transition-all border border-white/10 group-hover:border-electric-purple">Start Writing →</span>
          </Link>

          <Link href="/submit-video" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-abyss to-void-black border border-blue-500/30 hover:border-blue-500 transition-all p-10 flex flex-col items-center text-center hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🎬</span>
            <h3 className="text-3xl font-bold text-white mb-3 font-display tracking-wide">Share Video</h3>
            <p className="text-steel-gray mb-8 text-lg">Upload AMVs, edits, and fan animations</p>
            <span className="px-8 py-3 bg-white/5 rounded-full text-white font-bold group-hover:bg-blue-600 transition-all border border-white/10 group-hover:border-blue-600">Upload Video →</span>
          </Link>
        </motion.div>

        {!selectedCategory ? (
          // Category Selection
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-1 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="bg-void-black h-full w-full rounded-xl p-8 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4 font-display tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-steel-gray mb-8 leading-relaxed">
                      {category.description}
                    </p>
                    <span className="inline-block px-6 py-2 bg-white/10 rounded-full text-sm font-bold text-white group-hover:bg-white/20 transition-colors">
                      Explore →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Category Detail View
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={() => setSelectedCategory(null)}
              className="mb-8 flex items-center text-electric-purple hover:text-white transition-colors font-bold group"
              whileHover={{ x: -5 }}
            >
              <span className="mr-2 text-xl">←</span>
              Back to Categories
            </motion.button>

            {/* Category Header */}
            <div className={`bg-gradient-to-r ${selectedCategory.color} rounded-2xl p-12 mb-12 text-white text-center shadow-lg relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10">
                <div className="text-7xl mb-6">{selectedCategory.icon}</div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-wide">
                  {selectedCategory.title}
                </h2>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  {selectedCategory.description}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Upload Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-shadow-dark border border-white/10 rounded-2xl p-8"
              >
                <UploadComponent
                  onUpload={(file) => handleUpload(file, selectedCategory)}
                  acceptedTypes={selectedCategory.acceptedTypes}
                  maxSize={selectedCategory.maxSize}
                  title={`Upload ${selectedCategory.title}`}
                />
              </motion.section>

              {/* Recent Uploads */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6 font-display tracking-wide flex items-center gap-3">
                  <span className="text-electric-purple">⚡</span> Recent Uploads
                </h3>

                {uploads.filter(upload => upload.category.id === selectedCategory.id).length > 0 ? (
                  <div className="space-y-4">
                    {uploads
                      .filter(upload => upload.category.id === selectedCategory.id)
                      .slice(0, 5)
                      .map((upload) => (
                        <motion.div
                          key={upload.id}
                          className="bg-shadow-dark rounded-xl p-4 border border-white/5 hover:border-electric-purple/50 transition-colors flex items-center gap-4 group"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-16 h-16 bg-void-black rounded-lg flex items-center justify-center text-2xl border border-white/10">
                            {selectedCategory.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-white group-hover:text-electric-purple transition-colors">
                              {upload.file.name}
                            </p>
                            <p className="text-sm text-steel-gray">
                              {upload.timestamp}
                            </p>
                          </div>
                          {selectedCategory.id === 'character-designs' && (
                            <div className="w-20 h-20 relative rounded-lg border border-white/10 overflow-hidden">
                              <Image
                                src={upload.preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-shadow-dark rounded-2xl border border-white/5 border-dashed">
                    <div className="text-5xl mb-4 opacity-50">📁</div>
                    <p className="text-steel-gray text-lg">No uploads yet. Be the first to share!</p>
                  </div>
                )}
              </motion.section>
            </div>

            {/* Community Showcase */}
            <motion.section
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-white mb-10 text-center font-display tracking-wide">
                Community Showcase
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Placeholder showcase items */}
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="bg-shadow-dark rounded-2xl p-6 border border-white/5 hover:border-electric-purple/50 transition-all hover:-translate-y-2 hover:shadow-glow group"
                  >
                    <div className="aspect-video bg-void-black rounded-xl mb-6 flex items-center justify-center border border-white/5 group-hover:border-electric-purple/20 transition-colors">
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{selectedCategory.icon}</span>
                    </div>
                    <h4 className="font-bold text-xl text-white mb-2 group-hover:text-electric-purple transition-colors">
                      Featured Content #{item}
                    </h4>
                    <p className="text-steel-gray text-sm mb-4">
                      Amazing {selectedCategory.title.toLowerCase()} from our community
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <span className="text-xs text-steel-gray font-bold">@creator{item}</span>
                      <div className="flex space-x-3 text-sm font-bold">
                        <span className="text-electric-purple">👍 {12 + item * 5}</span>
                        <span className="text-steel-gray">💬 {3 + item}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
