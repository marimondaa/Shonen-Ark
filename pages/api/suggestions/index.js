import serverSupabase from '../../../src/lib/supabase-server';
const supabase = serverSupabase;

import { allowMethods } from '../../../src/lib/api-helpers';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      animeTitle, 
      description, 
      category, 
      reason, 
      submitterName, 
      submitterEmail 
    } = req.body;

    // Basic validation
    if (!animeTitle || !category || !reason) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['animeTitle', 'category', 'reason']
      });
    }

    // Email validation (if provided)
    if (submitterEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(submitterEmail)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
    }

    // Insert into database
    const { data, error } = await supabase
      .from('anime_suggestions')
      .insert([
        {
          anime_title: animeTitle.trim(),
          description: description?.trim() || null,
          category: category.trim(),
          reason: reason.trim(),
          submitter_name: submitterName?.trim() || null,
          submitter_email: submitterEmail?.toLowerCase().trim() || null,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to save anime suggestion' });
    }

    // Optional: Auto-tag using AI for categorization
    // This could integrate with your AI tagging service
    
    return res.status(200).json({ 
      success: true, 
      message: 'Anime suggestion submitted successfully',
      id: data[0]?.id
    });

  } catch (error) {
    console.error('Suggestions API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default allowMethods(['GET', 'POST'], handler);
