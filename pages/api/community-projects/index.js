// API route for community projects
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetProjects(req, res);
    case 'POST':
      return handleCreateProject(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}

async function handleGetProjects(req, res) {
  try {
    const { status, type, limit = 10, offset = 0 } = req.query;

    let query = supabase
      .from('community_projects')
      .select(`
        *,
        organizer:users!community_projects_organizer_id_fkey(username, avatar_url),
        participants:project_participants(
          user:users(username, avatar_url),
          role
        )
      `)
      .eq('status', status || 'recruiting')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type) {
      query = query.eq('project_type', type);
    }

    const { data: projects, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch community projects' });
  }
}

async function handleCreateProject(req, res) {
  try {
    const {
      title,
      description,
      organizer_id,
      max_participants,
      tags,
      project_type
    } = req.body;

    // Validate required fields
    if (!title || !description || !organizer_id || !project_type) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, description, organizer_id, project_type' 
      });
    }

    // Insert new project
    const { data: project, error } = await supabase
      .from('community_projects')
      .insert({
        title,
        description,
        organizer_id,
        max_participants,
        tags,
        project_type,
        status: 'recruiting'
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Add organizer as first participant
    await supabase
      .from('project_participants')
      .insert({
        project_id: project.id,
        user_id: organizer_id,
        role: 'organizer'
      });

    return res.status(201).json({ project });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create project' });
  }
}
