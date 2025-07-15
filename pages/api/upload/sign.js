// API route for generating Cloudinary signed upload URLs
import { generateSignedUploadUrl } from '../../../lib/cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { folder, resource_type } = req.body;

    // Generate unique public ID
    const timestamp = Date.now();
    const publicId = `${folder || 'uploads'}/${timestamp}`;

    const signedData = generateSignedUploadUrl(publicId, folder);

    return res.status(200).json(signedData);
  } catch (error) {
    console.error('Upload signing error:', error);
    return res.status(500).json({ error: 'Failed to generate upload signature' });
  }
}
