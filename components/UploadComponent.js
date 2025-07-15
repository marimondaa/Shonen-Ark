import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UploadComponent = ({ 
  onUpload, 
  acceptedTypes = "image/*", 
  maxSize = 5,
  title = "Upload Your Content"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length === 0) return;

    const file = files[0];
    setFileName(file.name);
    
    // Check file size (in MB)
    if (file.size > maxSize * 1024 * 1024) {
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }

    // Simulate upload (replace with actual upload logic)
    setTimeout(() => {
      setUploadStatus('success');
      if (onUpload) {
        onUpload(file);
      }
    }, 2000);
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setPreview(null);
    setFileName('');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold mystical-title text-purple mb-4 text-center">
        {title}
      </h3>
      
      <motion.div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-purple bg-purple/10 scale-105'
            : uploadStatus === 'error'
            ? 'border-red-500 bg-red-500/10'
            : uploadStatus === 'success'
            ? 'border-green-500 bg-green-500/10'
            : 'border-purple/50 hover:border-purple bg-bg-dark-secondary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        aria-label="File upload area"
        whileHover={{ scale: isDragging ? 1.05 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {uploadStatus === 'uploading' ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-purple font-semibold">Uploading {fileName}...</p>
              <p className="text-text-muted text-sm mt-2">Please wait while we process your file</p>
            </motion.div>
          ) : uploadStatus === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                className="text-green-500 text-4xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                ✅
              </motion.div>
              <p className="text-green-500 mb-4 font-semibold">Upload successful!</p>
              <p className="text-text-muted text-sm mb-4">{fileName}</p>
              {preview && (
                <motion.img 
                  src={preview} 
                  alt="Upload preview" 
                  className="max-w-full h-32 object-cover rounded mb-4 border border-purple/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                />
              )}
              <button
                onClick={resetUpload}
                className="bg-purple hover:bg-dark-purple text-white font-semibold px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-purple shrine-glow"
              >
                Upload Another
              </button>
            </motion.div>
          ) : uploadStatus === 'error' ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <motion.div 
                className="text-red-500 text-4xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                ❌
              </motion.div>
              <p className="text-red-500 mb-4 font-semibold">Upload failed!</p>
              <p className="text-text-muted text-sm mb-4">File too large (max {maxSize}MB)</p>
              <button
                onClick={resetUpload}
                className="bg-accent-pink hover:bg-accent-rose text-bg-dark font-semibold px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <motion.div 
                className="text-6xl mb-4" 
                aria-hidden="true"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🏮
              </motion.div>
              <p className="text-lg mb-2 mystical-title">Drag & drop files here</p>
              <p className="text-text-muted mb-4 brush-font">or click to browse your mystical collection</p>
              <input
                type="file"
                onChange={handleFileSelect}
                accept={acceptedTypes}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-accent-pink hover:bg-accent-rose text-bg-dark font-semibold px-6 py-3 rounded cursor-pointer transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-accent-pink shrine-glow"
              >
                Choose Files
              </label>
              <p className="text-xs text-text-muted mt-4">
                Max file size: {maxSize}MB | Supported: {acceptedTypes}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UploadComponent;
