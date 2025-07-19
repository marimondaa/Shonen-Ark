import { useState, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import UploadComponent from '../src/components/features/UploadComponent';

export default function Shrine() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const handleFileUpload = (files) => {
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      category: getCategoryFromType(file.type),
      uploadDate: new Date().toISOString()
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const getCategoryFromType = (type) => {
    if (type.startsWith('image/')) return 'images';
    if (type.startsWith('video/')) return 'videos';
    if (type.startsWith('audio/')) return 'audio';
    return 'documents';
  };

  const filterFiles = () => {
    if (activeCategory === 'all') return uploadedFiles;
    return uploadedFiles.filter(file => file.category === activeCategory);
  };

  const categories = [
    { id: 'all', label: 'All Files', icon: '📁' },
    { id: 'images', label: 'Images', icon: '🖼️' },
    { id: 'videos', label: 'Videos', icon: '🎥' },
    { id: 'audio', label: 'Audio', icon: '🎵' },
    { id: 'documents', label: 'Documents', icon: '📄' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <Head>
        <title>Media Shrine - Shonen Ark</title>
        <meta name="description" content="Upload and share your anime and manga related media files." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <motion.header 
          className="bg-gradient-to-r from-dark-purple/80 to-purple/80 py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-6xl mb-4">⛩️</div>
              <h1 className="text-4xl font-bold mystical-title mb-4 glow-text">
                Media Shrine
              </h1>
              <p className="text-xl text-grey brush-font max-w-2xl mx-auto">
                Upload and share your favorite anime artwork, videos, music, and documents with the community
              </p>
            </motion.div>
          </div>
        </motion.header>

        {/* Upload Section */}
        <motion.section 
          className="py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-dark-purple/20 rounded-lg p-8 border border-purple/30 mb-8">
              <h2 className="text-2xl font-bold mystical-title text-purple mb-6 text-center">
                Upload Your Media
              </h2>
              <UploadComponent onUpload={handleFileUpload} />
            </div>
          </div>
        </motion.section>

        {/* Category Filter */}
        {uploadedFiles.length > 0 && (
          <motion.section 
            className="py-8 border-b border-grey/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-purple text-white'
                        : 'bg-dark-purple/30 text-grey hover:text-white hover:bg-purple/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Uploaded Files Gallery */}
        <motion.section 
          className="py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {uploadedFiles.length > 0 ? (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
              >
                {filterFiles().map((file) => (
                  <motion.div
                    key={file.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-dark-purple/30 rounded-lg overflow-hidden border border-purple/20 hover:border-purple/50 transition-all duration-300 shrine-glow"
                  >
                    {/* File Preview */}
                    <div className="aspect-square relative overflow-hidden">
                      {file.category === 'images' ? (
                        <img 
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple/20 to-dark-purple/20 flex items-center justify-center">
                          <span className="text-4xl">
                            {file.category === 'videos' ? '🎥' : 
                             file.category === 'audio' ? '🎵' : '📄'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* File Info */}
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2 truncate">
                        {file.name}
                      </h3>
                      
                      <div className="flex justify-between items-center text-sm text-grey">
                        <span>{formatFileSize(file.size)}</span>
                        <span className="text-purple">
                          {file.category}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-xs text-grey">
                        {new Date(file.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-16"
                variants={itemVariants}
              >
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-2xl font-bold text-grey mb-4">No files uploaded yet</h3>
                <p className="text-grey">Upload your first file using the upload area above!</p>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </>
  );
}
