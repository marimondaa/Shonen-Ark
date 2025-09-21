import { uploadToCloudinary } from '../../../src/lib/cloudinary-server';
import formidable from 'formidable';
import fs from 'fs';
import { allowMethods } from '../../../src/lib/api-helpers';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'audio/wav', 'video/mp4'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'File type not allowed' });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(file.filepath, {
      resource_type: file.mimetype.startsWith('audio') ? 'video' : 'auto',
      public_id: `${Date.now()}-${file.originalFilename}`,
    });

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error('Upload API error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}

export default allowMethods(['POST'], handler);
