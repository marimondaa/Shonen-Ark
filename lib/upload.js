/**
 * File upload utilities for Shonen Ark
 * Handles Cloudinary integration and file management
 */

/**
 * Mock file upload to simulate Cloudinary integration
 * In production, replace with actual Cloudinary SDK calls
 */

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/mov', 'video/avi'];
const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/aac'];

const MAX_FILE_SIZES = {
  image: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  audio: 25 * 1024 * 1024, // 25MB
};

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @param {string} category - Upload category
 * @returns {Object} - Validation result
 */
export function validateFile(file, category) {
  const errors = [];
  
  if (!file) {
    return { isValid: false, errors: ['No file provided'] };
  }
  
  // Check file type based on category
  let allowedTypes = [];
  let maxSize = 0;
  
  switch (category) {
    case 'character-designs':
      allowedTypes = ALLOWED_IMAGE_TYPES;
      maxSize = MAX_FILE_SIZES.image;
      break;
    case 'fan-fights':
      allowedTypes = ALLOWED_VIDEO_TYPES;
      maxSize = MAX_FILE_SIZES.video;
      break;
    case 'audio-fx':
      allowedTypes = ALLOWED_AUDIO_TYPES;
      maxSize = MAX_FILE_SIZES.audio;
      break;
    default:
      allowedTypes = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES, ...ALLOWED_AUDIO_TYPES];
      maxSize = MAX_FILE_SIZES.video;
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not allowed. Accepted types: ${allowedTypes.join(', ')}`);
  }
  
  if (file.size > maxSize) {
    errors.push(`File too large. Maximum size: ${Math.round(maxSize / 1024 / 1024)}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    fileInfo: {
      name: file.name,
      size: file.size,
      type: file.type,
      category
    }
  };
}

/**
 * Generate thumbnail for uploaded content
 * @param {File} file - Original file
 * @param {string} type - File type
 * @returns {Promise<string>} - Thumbnail URL
 */
export async function generateThumbnail(file, type) {
  // Simulate thumbnail generation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (type.startsWith('video/')) {
    // For videos, would extract frame from video
    return `/api/thumbnails/video_${Date.now()}.jpg`;
  } else if (type.startsWith('image/')) {
    // For images, would create smaller version
    return `/api/thumbnails/image_${Date.now()}.jpg`;
  } else if (type.startsWith('audio/')) {
    // For audio, would generate waveform visualization
    return `/api/thumbnails/audio_${Date.now()}.jpg`;
  }
  
  return `/api/thumbnails/default.jpg`;
}

/**
 * Upload file to cloud storage (Cloudinary simulation)
 * @param {File} file - File to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Upload result
 */
export async function uploadFile(file, options = {}) {
  const { category, userId, description = '', tags = [] } = options;
  
  // Validate file first
  const validation = validateFile(file, category);
  if (!validation.isValid) {
    throw new Error(`Upload failed: ${validation.errors.join(', ')}`);
  }
  
  // Simulate upload progress
  const uploadProgress = (callback) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      callback(Math.round(progress));
    }, 200);
  };
  
  // Simulate actual upload to Cloudinary
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.05) { // 95% success rate
        resolve();
      } else {
        reject(new Error('Upload failed. Please try again.'));
      }
    }, 2000 + Math.random() * 3000); // 2-5 second upload time
  });
  
  // Generate thumbnail
  const thumbnailUrl = await generateThumbnail(file, file.type);
  
  // Generate unique file URL
  const fileExtension = file.name.split('.').pop();
  const uniqueId = Date.now() + Math.random().toString(36).substring(2);
  const fileName = `${category}/${userId}/${uniqueId}.${fileExtension}`;
  
  return {
    success: true,
    fileUrl: `/uploads/${fileName}`,
    thumbnailUrl,
    publicId: uniqueId,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    category,
    uploadedAt: new Date().toISOString(),
    metadata: {
      width: file.type.startsWith('image/') ? 1920 : null,
      height: file.type.startsWith('image/') ? 1080 : null,
      duration: file.type.startsWith('video/') ? 120 : null, // seconds
      format: fileExtension,
      description,
      tags
    }
  };
}

/**
 * Delete uploaded file
 * @param {string} publicId - Public ID of the file to delete
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteFile(publicId) {
  // Simulate deletion
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In production, call Cloudinary's destroy method
  console.log(`Deleting file with ID: ${publicId}`);
  
  return true;
}

/**
 * Get signed upload URL for direct client uploads
 * @param {string} category - Upload category
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Signed upload data
 */
export async function getSignedUploadUrl(category, userId) {
  // Simulate getting signed URL from Cloudinary
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = `mock_signature_${timestamp}`;
  
  return {
    url: 'https://api.cloudinary.com/v1_1/shonen-ark/auto/upload',
    signature,
    timestamp,
    apiKey: 'mock_api_key',
    folder: `${category}/${userId}`,
    allowedFormats: category === 'character-designs' ? 'jpg,png,gif,webp' :
                    category === 'fan-fights' ? 'mp4,webm,mov' :
                    category === 'audio-fx' ? 'mp3,wav,m4a' : 'auto'
  };
}

/**
 * Process uploaded file metadata
 * @param {Object} uploadResult - Result from Cloudinary
 * @returns {Object} - Processed metadata
 */
export function processUploadMetadata(uploadResult) {
  return {
    fileUrl: uploadResult.secure_url || uploadResult.url,
    publicId: uploadResult.public_id,
    fileName: uploadResult.original_filename,
    fileSize: uploadResult.bytes,
    fileType: uploadResult.resource_type,
    format: uploadResult.format,
    width: uploadResult.width,
    height: uploadResult.height,
    duration: uploadResult.duration,
    thumbnailUrl: uploadResult.eager?.[0]?.secure_url || uploadResult.secure_url,
    uploadedAt: uploadResult.created_at,
    etag: uploadResult.etag
  };
}

/**
 * Create video/audio preview for uploaded media
 * @param {string} fileUrl - URL of the uploaded file
 * @param {string} type - File type
 * @returns {Promise<string>} - Preview URL
 */
export async function createMediaPreview(fileUrl, type) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (type.startsWith('video/')) {
    // Generate video preview/gif
    return fileUrl.replace(/\.[^/.]+$/, '_preview.gif');
  } else if (type.startsWith('audio/')) {
    // Generate audio waveform
    return fileUrl.replace(/\.[^/.]+$/, '_waveform.svg');
  }
  
  return fileUrl;
}

/**
 * Get upload analytics for a user
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Upload analytics
 */
export async function getUploadAnalytics(userId) {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Mock analytics data
  return {
    totalUploads: 45,
    totalViews: 12500,
    totalLikes: 890,
    storageUsed: '2.3 GB',
    storageLimit: '10 GB',
    uploadsByCategory: {
      'character-designs': 20,
      'fan-fights': 15,
      'audio-fx': 10
    },
    topPerforming: [
      { fileName: 'naruto_vs_sasuke.mp4', views: 3200, likes: 150 },
      { fileName: 'luffy_gear5.png', views: 2800, likes: 120 },
      { fileName: 'demon_slayer_ost.mp3', views: 2100, likes: 95 }
    ],
    monthlyStats: {
      uploads: 8,
      views: 2400,
      likes: 180
    }
  };
}

// Utility functions for file handling
export const fileUtils = {
  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} - Formatted size
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Get file type icon
   * @param {string} fileType - MIME type
   * @returns {string} - Icon emoji
   */
  getFileTypeIcon(fileType) {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    return '📄';
  },

  /**
   * Extract file extension
   * @param {string} fileName - File name
   * @returns {string} - File extension
   */
  getFileExtension(fileName) {
    return fileName.split('.').pop().toLowerCase();
  }
};

// Export all functions
export default {
  validateFile,
  uploadFile,
  deleteFile,
  generateThumbnail,
  getSignedUploadUrl,
  processUploadMetadata,
  createMediaPreview,
  getUploadAnalytics,
  fileUtils
};
