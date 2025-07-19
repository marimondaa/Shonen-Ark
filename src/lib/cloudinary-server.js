// Server-side only Cloudinary utilities
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Server-side upload function
export const uploadToCloudinary = async (filePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'shonen-ark',
      resource_type: 'auto',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      ...options,
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Generate signed upload parameters
export const generateSignedUploadParams = (options = {}) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const params = {
    timestamp,
    folder: 'shonen-ark',
    ...options,
  };

  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);

  return {
    ...params,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  };
};
