import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fileUtils } from '../lib/upload';

const UploadComponent = ({ 
  category = 'character-designs', 
  onUploadComplete, 
  maxFileSize = 10 * 1024 * 1024,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif'],
  multiple = false 
}) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} not allowed for ${category}`);
        return false;
      }
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size: ${fileUtils.formatFileSize(maxFileSize)}`);
        return false;
      }
      return true;
    });

    const filesWithMetadata = validFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      status: 'pending'
    }));

    if (multiple) {
      setFiles(prev => [...prev, ...filesWithMetadata]);
    } else {
      setFiles(filesWithMetadata);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(f => f.id !== fileId);
      // Clean up object URLs
      prev.forEach(f => {
        if (f.preview && f.id === fileId) {
          URL.revokeObjectURL(f.preview);
        }
      });
      return updatedFiles;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const uploadPromises = files.map(async (fileObj) => {
      try {
        setUploadProgress(prev => ({ ...prev, [fileObj.id]: 0 }));
        
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [fileObj.id]: Math.min((prev[fileObj.id] || 0) + Math.random() * 30, 90)
          }));
        }, 200);

        // Mock upload - replace with actual upload logic
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
        
        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [fileObj.id]: 100 }));

        // Mock successful upload result
        const uploadResult = {
          id: `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          url: `/uploads/${category}/${fileObj.name}`,
          thumbnailUrl: fileObj.preview || `/uploads/thumbs/${fileObj.name}`,
          fileName: fileObj.name,
          fileSize: fileObj.size,
          fileType: fileObj.type,
          category,
          uploadedAt: new Date().toISOString()
        };

        return uploadResult;
      } catch (error) {
        console.error('Upload failed:', error);
        throw error;
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      setFiles([]);
      setUploadProgress({});
      onUploadComplete && onUploadComplete(results);
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getCategoryInfo = () => {
    const categoryConfig = {
      'fan-fights': {
        title: 'Fan Fight Animation',
        description: 'Upload your epic battle animations',
        icon: '⚔️',
        allowedFormats: 'MP4, WEBM, MOV',
        maxSize: '100MB'
      },
      'audio-fx': {
        title: 'Audio Effects',
        description: 'Share your custom soundtracks and effects',
        icon: '🎵',
        allowedFormats: 'MP3, WAV, M4A',
        maxSize: '25MB'
      },
      'character-designs': {
        title: 'Character Designs',
        description: 'Show off your character artwork and designs',
        icon: '🎨',
        allowedFormats: 'JPG, PNG, GIF, WEBP',
        maxSize: '10MB'
      }
    };

    return categoryConfig[category] || categoryConfig['character-designs'];
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Upload Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{categoryInfo.icon}</div>
        <h2 className="text-2xl font-bold text-white mb-2">{categoryInfo.title}</h2>
        <p className="text-gray-400 mb-4">{categoryInfo.description}</p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <span>📁 {categoryInfo.allowedFormats}</span>
          <span>📏 Max {categoryInfo.maxSize}</span>
        </div>
      </div>

      {/* Drop Zone */}
      <motion.div
        className={`
          relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
          ${dragActive 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-600 hover:border-gray-500'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={allowedTypes.join(',')}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="text-4xl">
            {dragActive ? '📤' : '📁'}
          </div>
          <div>
            <p className="text-lg font-semibold text-white mb-2">
              {dragActive ? 'Drop files here' : 'Drag & drop files or click to browse'}
            </p>
            <p className="text-gray-400 text-sm">
              {multiple ? 'Select multiple files' : 'Select a file'} to upload to {categoryInfo.title.toLowerCase()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-3"
          >
            <h3 className="text-lg font-semibold text-white">Selected Files ({files.length})</h3>
            
            {files.map((fileObj) => (
              <motion.div
                key={fileObj.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-gray-800 rounded-lg p-4 flex items-center gap-4"
              >
                {/* File Preview */}
                <div className="flex-shrink-0">
                  {fileObj.preview ? (
                    <img 
                      src={fileObj.preview} 
                      alt={fileObj.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                      {fileUtils.getFileTypeIcon(fileObj.type)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{fileObj.name}</p>
                  <p className="text-gray-400 text-sm">{fileUtils.formatFileSize(fileObj.size)}</p>
                  
                  {/* Upload Progress */}
                  {uploading && uploadProgress[fileObj.id] !== undefined && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Uploading...</span>
                        <span>{Math.round(uploadProgress[fileObj.id])}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress[fileObj.id]}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                {!uploading && (
                  <button
                    onClick={() => removeFile(fileObj.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    ❌
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Button */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-center"
        >
          <button
            onClick={uploadFiles}
            disabled={uploading}
            className={`
              px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300
              ${uploading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
              }
            `}
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} file${files.length > 1 ? 's' : ''}`}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UploadComponent;
