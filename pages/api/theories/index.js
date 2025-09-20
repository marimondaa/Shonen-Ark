import serverSupabase from '../../../src/lib/supabase-server';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import { allowMethods } from '../../../src/lib/api-helpers';

const supabase = serverSupabase;

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetTheories(req, res);
    case 'POST':
      return handleCreateTheory(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}

async function handleGetTheories(req, res) {
  try {
    const { 
      page = 1, 
      limit = 12, 
      category, 
      sortBy = 'newest',
      search,
      creatorId
    } = req.query;

    let query = supabase
      .from('theories')
      .select(`
        *,
        creator:users(id, name, avatar),
        likes:theory_likes(count),
        comments:theory_comments(count),
        bookmarks:theory_bookmarks(count)
      `);

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%, content.ilike.%${search}%`);
    }

    if (creatorId) {
      query = query.eq('creator_id', creatorId);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      case 'popular':
        query = query.order('likes_count', { ascending: false });
        break;
      case 'trending':
        // Complex trending algorithm - simplified here
        query = query.order('views_count', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);

    const { data: theories, error, count } = await query;

    if (error) {
      console.error('Error fetching theories:', error);
      return res.status(500).json({ error: 'Failed to fetch theories' });
    }

    return res.status(200).json({
      theories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get theories error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default allowMethods(['GET', 'POST'], handler);

async function handleCreateTheory(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const {
      title,
      content,
      category,
      tags,
      thumbnail,
      isPublic = true,
      isPremium = false
    } = req.body;

    // Validation
    if (!title || !content || !category) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, content, category' 
      });
    }

    // Check if user can create premium content
    if (isPremium && session.user.accountType !== 'creator') {
      return res.status(403).json({ 
        error: 'Only creators can publish premium content' 
      });
    }

    const theoryData = {
      title,
      content,
      category,
      tags: tags || [],
      thumbnail,
      is_public: isPublic,
      is_premium: isPremium,
      creator_id: session.user.id,
      likes_count: 0,
      views_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: theory, error } = await supabase
      .from('theories')
      .insert(theoryData)
      .select(`
        *,
        creator:users(id, name, avatar)
      `)
      .single();

    if (error) {
      console.error('Error creating theory:', error);
      return res.status(500).json({ error: 'Failed to create theory' });
    }

    return res.status(201).json({ theory });

  } catch (error) {
    console.error('Create theory error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
