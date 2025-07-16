// API route for managing gigs/jobs
// Using mock data for demo purposes

// Mock gigs data
const mockGigs = [
  {
    id: 1,
    title: "Anime Theory Content Creator",
    company: "Shonen Ark",
    location: "Remote",
    type: "Part-time",
    description: "Create engaging anime theory content for our community.",
    requirements: ["Strong writing skills", "Deep anime knowledge", "Creative thinking"],
    salary: "$2,000 - $3,000/month",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Community Moderator",
    company: "Anime Hub",
    location: "Remote",
    type: "Contract",
    description: "Moderate discussions and maintain community guidelines.",
    requirements: ["Community management experience", "Conflict resolution", "Anime passion"],
    salary: "$1,500 - $2,000/month",
    created_at: new Date().toISOString()
  }
];

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetGigs(req, res);
    case 'POST':
      return handleCreateGig(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}

async function handleGetGigs(req, res) {
  try {
    const { type, status, limit = 10, offset = 0 } = req.query;

    // Filter mock data based on query parameters
    let filteredGigs = [...mockGigs];
    
    if (type) {
      filteredGigs = filteredGigs.filter(gig => 
        gig.type.toLowerCase().includes(type.toLowerCase())
      );
    }

    // Apply pagination
    const startIndex = parseInt(offset);
    const endIndex = startIndex + parseInt(limit);
    const paginatedGigs = filteredGigs.slice(startIndex, endIndex);

    return res.status(200).json({
      success: true,
      data: paginatedGigs,
      total: filteredGigs.length,
      hasMore: endIndex < filteredGigs.length
    });
  } catch (error) {
    console.error('Error fetching gigs:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch gigs'
    });
  }
}
        *,
        poster:users!gigs_poster_id_fkey(username, avatar_url),
        applications_count
      `)
      .eq('status', status || 'open')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type) {
      query = query.eq('type', type);
    }

    const { data: gigs, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ gigs });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch gigs' });
  }
}

async function handleCreateGig(req, res) {
  try {
    const {
      title,
      description,
      type,
      budget_min,
      budget_max,
      deadline,
      tags,
      poster_id
    } = req.body;

    // Validate required fields
    if (!title || !description || !type || !poster_id) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, description, type, poster_id' 
      });
    }

    // Insert new gig
    const { data: gig, error } = await supabase
      .from('gigs')
      .insert({
        title,
        description,
        type,
        budget_min,
        budget_max,
        deadline,
        tags,
        poster_id,
        status: 'open'
      })
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ gig });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create gig' });
  }
}
