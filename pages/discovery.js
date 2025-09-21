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
  <div className="min-h-screen py-8 bg-bg-dark text-text-light transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header 
          className="text-center mb-12 manga-card p-8 bg-ink-black text-paper-beige transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold font-manga-header mb-4 text-purple uppercase tracking-widest">
            Discovery Feed
          </h1>
          <p className="text-xl font-manga-body max-w-2xl mx-auto text-paper-beige/80 transition-colors">
            Explore fan creations across different categories. Share your own content 
            and discover amazing works from the community.
          </p>
        </motion.header>

        {!selectedCategory ? (
          // Category Selection
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${category.color} rounded-lg p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-white`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold mystical-title mb-4">
                    {category.title}
                  </h3>
                  <p className="opacity-90">
                    {category.description}
                  </p>
                  <div className="mt-6">
                    <span className="bg-black/10 dark:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                      Click to Enter →
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
              className="mb-8 flex items-center text-purple hover:text-accent-pink transition-colors"
              whileHover={{ x: -5 }}
            >
              <span className="mr-2">←</span>
              Back to Categories
            </motion.button>

            {/* Category Header */}
            <div className={`bg-gradient-to-r ${selectedCategory.color} rounded-lg p-8 mb-8 text-white text-center`}>
              <div className="text-6xl mb-4">{selectedCategory.icon}</div>
              <h2 className="text-3xl font-bold mystical-title mb-4">
                {selectedCategory.title}
              </h2>
              <p className="text-xl brush-font opacity-90">
                {selectedCategory.description}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Upload Section */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
                <h3 className="text-xl font-bold mystical-title text-accent-pink mb-6">
                  Recent Uploads
                </h3>
                
                {uploads.filter(upload => upload.category.id === selectedCategory.id).length > 0 ? (
                  <div className="space-y-4">
                    {uploads
                      .filter(upload => upload.category.id === selectedCategory.id)
                      .slice(0, 5)
                      .map((upload) => (
                        <motion.div
                          key={upload.id}
                          className="bg-bg-dark-secondary/50 rounded-lg p-4 border border-accent-pink/20"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-accent-pink">
                                {upload.file.name}
                              </p>
                              <p className="text-sm text-text-muted">
                                {upload.timestamp}
                              </p>
                            </div>
                            {selectedCategory.id === 'character-designs' && (
                              <div className="w-16 h-16 relative rounded border border-accent-pink/30 overflow-hidden">
                                <Image
                                  src={upload.preview}
                                  alt="Preview"
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-text-muted">
                    <div className="text-4xl mb-4">📁</div>
                    <p>No uploads yet. Be the first to share!</p>
                  </div>
                )}
              </motion.section>
            </div>

            {/* Community Showcase */}
            <motion.section 
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-2xl font-bold mystical-title text-accent-pink mb-8 text-center">
                Community Showcase
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder showcase items */}
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="bg-anime-blue/30 backdrop-blur-sm rounded-lg p-6 border border-accent-pink/20 shrine-glow"
                  >
                    <div className="aspect-video bg-bg-dark-secondary rounded mb-4 flex items-center justify-center">
                      <span className="text-4xl">{selectedCategory.icon}</span>
                    </div>
                    <h4 className="font-bold text-accent-pink mb-2">
                      Featured Content #{item}
                    </h4>
                    <p className="text-text-muted text-sm">
                      Amazing {selectedCategory.title.toLowerCase()} from our community
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-text-muted">@creator{item}</span>
                      <div className="flex space-x-2 text-sm">
                        <span className="text-accent-pink">👍 {12 + item * 5}</span>
                        <span className="text-text-muted">💬 {3 + item}</span>
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
