// Cloudinary upload utilities with signed URLs
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (server-side only)
if (typeof window === 'undefined') {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Generate signed upload URL (server-side)
export function generateSignedUploadUrl(publicId, folder = 'shonen-ark') {
  const timestamp = Math.round((new Date()).getTime() / 1000);
  
  const params = {
    timestamp,
    folder,
    resource_type: 'auto', // Supports images, videos, and audio
    allowed_formats: 'jpg,jpeg,png,gif,mp4,mp3,wav,pdf',
    max_file_size: 10000000, // 10MB
  };

  if (publicId) {
    params.public_id = publicId;
  }

  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);

  return {
    url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
    params: {
      ...params,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
    }
  };
}

// Client-side upload function
export async function uploadToCloudinary(file, options = {}) {
  try {
    // Get signed upload URL from our API
    const signResponse = await fetch('/api/upload/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        folder: options.folder || 'shonen-ark',
        resource_type: getResourceType(file.type)
      })
    });

    if (!signResponse.ok) {
      throw new Error('Failed to get upload signature');
    }

    const { url, params } = await signResponse.json();

    // Create form data for upload
    const formData = new FormData();
    formData.append('file', file);
    
    Object.keys(params).forEach(key => {
      formData.append(key, params[key]);
    });

    // Upload to Cloudinary
    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!uploadResponse.ok) {
      throw new Error('Upload failed');
    }

    const result = await uploadResponse.json();
    
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      resourceType: result.resource_type,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
      duration: result.duration // For audio/video
    };
    
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Determine resource type from file MIME type
function getResourceType(mimeType) {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'video'; // Cloudinary uses 'video' for audio
  return 'raw';
}

// Get optimized image URL with transformations
export function getOptimizedImageUrl(publicId, options = {}) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options;

  let transformation = `q_${quality},f_${format}`;
  
  if (width || height) {
    transformation += `,c_${crop}`;
    if (width) transformation += `,w_${width}`;
    if (height) transformation += `,h_${height}`;
  }

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
}

// Delete file from Cloudinary
export async function deleteFromCloudinary(publicId, resourceType = 'image') {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

// Validate file before upload
export function validateFile(file, allowedTypes = ['image', 'audio', 'video']) {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const errors = [];

  // Check file size
  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }

  // Check file type
  const fileType = getResourceType(file.type);
  if (!allowedTypes.includes(fileType)) {
    errors.push(`File type ${file.type} is not allowed`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
