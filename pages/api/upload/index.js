import { createClient } from '@supabase/supabase-js';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { allowMethods } from '../../../src/lib/api-helpers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images, videos, and audio files
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime',
      'audio/mpeg', 'audio/wav', 'audio/ogg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
});

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Run multer middleware
    await runMiddleware(req, res, upload.single('file'));

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const { category, title, description, tags } = req.body;

    // Generate unique filename
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `uploads/${category}/${session.user.id}/${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('shonen-ark-uploads')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('shonen-ark-uploads')
      .getPublicUrl(filePath);

    // Determine content type
    let contentType = 'image';
    if (file.mimetype.startsWith('video/')) {
      contentType = 'video';
    } else if (file.mimetype.startsWith('audio/')) {
      contentType = 'audio';
    }

    // Save upload record to database
    const uploadRecord = {
      id: uuidv4(),
      user_id: session.user.id,
      filename: file.originalname,
      file_path: filePath,
      file_url: publicUrl,
      file_size: file.size,
      mime_type: file.mimetype,
      content_type: contentType,
      category: category || 'general',
      title: title || file.originalname,
      description: description || '',
      tags: tags ? JSON.parse(tags) : [],
      is_public: true,
      likes_count: 0,
      views_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: upload, error: dbError } = await supabase
      .from('uploads')
      .insert(uploadRecord)
      .select(`
        *,
        creator:users(id, name, avatar)
      `)
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
      
      // Clean up uploaded file if DB insert fails
      await supabase.storage
        .from('shonen-ark-uploads')
        .remove([filePath]);
        
      return res.status(500).json({ error: 'Failed to save upload record' });
    }

    return res.status(201).json({
      message: 'File uploaded successfully',
      upload
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.message === 'File type not allowed') {
      return res.status(400).json({ error: 'File type not allowed' });
    }
    
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large (max 50MB)' });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default allowMethods(['POST'], handler);
