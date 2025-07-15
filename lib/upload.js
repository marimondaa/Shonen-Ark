// Upload utilities for Shonen Ark
// Cloudinary integration for image and media uploads

/**
 * Upload image to Cloudinary
 * @param {File} file - File to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Upload result
 */
export async function uploadToCloudinary(file, options = {}) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    
    // Add folder organization
    if (options.folder) {
      formData.append('folder', `shonen-ark/${options.folder}`);
    }
    
    // Add tags for organization
    if (options.tags) {
      formData.append('tags', options.tags.join(','));
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    
    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      size: data.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate signed upload URL for secure uploads
 * @param {Object} options - Upload parameters
 * @returns {Promise<Object>} Signed upload data
 */
export async function getSignedUploadUrl(options = {}) {
  try {
    const response = await fetch('/api/upload/signed-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error('Failed to get signed URL');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to get signed URL:', error);
    throw error;
  }
}

/**
 * Upload multiple files
 * @param {FileList} files - Files to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Array>} Array of upload results
 */
export async function uploadMultipleFiles(files, options = {}) {
  const uploads = Array.from(files).map(file => 
    uploadToCloudinary(file, {
      ...options,
      tags: [...(options.tags || []), 'batch-upload'],
    })
  );

  try {
    const results = await Promise.all(uploads);
    return results;
  } catch (error) {
    console.error('Batch upload failed:', error);
    throw error;
  }
}

/**
 * Validate file before upload
 * @param {File} file - File to validate
 * @param {Object} constraints - Validation constraints
 * @returns {Object} Validation result
 */
export function validateFile(file, constraints = {}) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxWidth = 2048,
    maxHeight = 2048,
  } = constraints;

  const errors = [];

  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Optimize image before upload
 * @param {File} file - Image file to optimize
 * @param {Object} options - Optimization options
 * @returns {Promise<File>} Optimized file
 */
export function optimizeImage(file, options = {}) {
  return new Promise((resolve, reject) => {
    const {
      maxWidth = 1200,
      maxHeight = 1200,
      quality = 0.8,
    } = options;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          const optimizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(optimizedFile);
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteFromCloudinary(publicId) {
  try {
    const response = await fetch('/api/upload/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      throw new Error('Delete failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to delete image:', error);
    throw error;
  }
}

/**
 * Generate Cloudinary transformation URL
 * @param {string} publicId - Public ID of the image
 * @param {Object} transformations - Transformation options
 * @returns {string} Transformed image URL
 */
export function getTransformedImageUrl(publicId, transformations = {}) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = transformations;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  let transformString = [];
  
  if (width) transformString.push(`w_${width}`);
  if (height) transformString.push(`h_${height}`);
  if (crop) transformString.push(`c_${crop}`);
  if (quality) transformString.push(`q_${quality}`);
  if (format) transformString.push(`f_${format}`);

  const transforms = transformString.join(',');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`;
}

// File type helpers
export const FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  VIDEO: ['video/mp4', 'video/webm', 'video/ogg'],
  DOCUMENT: ['application/pdf', 'text/plain'],
};

export const UPLOAD_PRESETS = {
  PROFILE_AVATAR: 'profile_avatars',
  THEORY_IMAGES: 'theory_content',
  COVER_IMAGES: 'cover_images',
  USER_CONTENT: 'user_uploads',
};

export default {
  uploadToCloudinary,
  getSignedUploadUrl,
  uploadMultipleFiles,
  validateFile,
  optimizeImage,
  deleteFromCloudinary,
  getTransformedImageUrl,
  FILE_TYPES,
  UPLOAD_PRESETS,
};
