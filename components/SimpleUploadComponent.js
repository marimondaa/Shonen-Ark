import { useState } from 'react';
import { motion } from 'framer-motion';

const SimpleUploadComponent = ({ category = 'general', onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);

      const response = await fetch('/api/upload/upload-file', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadProgress(100);
        onUploadComplete?.(result);
        setFile(null);
      } else {
        setError(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Network error occurred');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const getAcceptedTypes = () => {
    switch (category) {
      case 'fan-fights':
        return 'video/mp4,video/webm';
      case 'audio-fx':
        return 'audio/mpeg,audio/wav,audio/mp3';
      case 'character-designs':
        return 'image/jpeg,image/png,image/gif';
      default:
        return 'image/*,audio/*,video/*';
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-900/30 to-black/50 p-6 rounded-lg border border-purple/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-bold text-white mb-4">Upload Content</h3>
      
      <div className="mb-4">
        <input
          type="file"
          accept={getAcceptedTypes()}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          disabled={uploading}
        />
        <label
          htmlFor="file-upload"
          className="block w-full p-4 border-2 border-dashed border-purple/40 rounded-lg text-center cursor-pointer hover:border-purple/60 transition-colors"
        >
          {file ? (
            <span className="text-white">{file.name}</span>
          ) : (
            <span className="text-grey">Click to select file</span>
          )}
        </label>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded text-red-200">
          {error}
        </div>
      )}

      {uploading && (
        <div className="mb-4">
          <div className="bg-dark-purple/50 rounded-full h-2">
            <motion.div
              className="bg-purple h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-grey mt-2">Uploading... {uploadProgress}%</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-purple hover:bg-dark-purple disabled:bg-grey/50 text-white px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </motion.div>
  );
};

export default SimpleUploadComponent;
