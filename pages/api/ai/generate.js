// OpenAI removed in favor of n8n AI workflows
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';

// Note: AI functionality is now handled through n8n workflows
// This endpoint serves as a placeholder for future n8n integration

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return handleAIRequest(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: `Method ${method} not allowed` });
  }
}

async function handleAIRequest(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const { action, prompt, context, theoryId } = req.body;

    if (!action || !prompt) {
      return res.status(400).json({ 
        error: 'Missing required fields: action, prompt' 
      });
    }

    // Check user's AI usage limits
    const { data: usage, error: usageError } = await supabase
      .from('ai_usage')
      .select('*')
      .eq('user_id', session.user.id)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });

    if (usageError) {
      console.error('Error checking AI usage:', usageError);
    }

    // Rate limiting: 50 requests per day for free users, 200 for premium
    const dailyLimit = session.user.subscriptionTier === 'premium' ? 200 : 50;
    const dailyUsage = usage?.length || 0;

    if (dailyUsage >= dailyLimit) {
      return res.status(429).json({ 
        error: 'Daily AI usage limit exceeded. Upgrade to premium for higher limits.' 
      });
    }

    let systemPrompt = '';
    let userPrompt = prompt;

    // Configure AI based on action type
    switch (action) {
      case 'generate_theory':
        systemPrompt = `You are an expert anime and manga analyst. Generate comprehensive, well-researched theories based on the user's prompt. 
        Structure your response with clear sections: Introduction, Evidence, Analysis, and Conclusion. 
        Reference specific manga chapters, anime episodes, or character developments when relevant.
        Keep theories engaging but grounded in actual source material.`;
        break;

      case 'analyze_character':
        systemPrompt = `You are a character analysis expert for anime and manga. Provide deep character analysis covering:
        - Character development and growth
        - Motivations and psychology
        - Relationships and dynamics
        - Potential future developments
        Base your analysis on canon material and well-established character traits.`;
        break;

      case 'power_scaling':
        systemPrompt = `You are a power scaling expert for anime and manga. Analyze character abilities, compare power levels, and explain:
        - Ability mechanics and limitations
        - Comparative analysis with other characters
        - Power progression and potential
        - Battle outcome predictions based on feats
        Use concrete examples from the source material.`;
        break;

      case 'plot_prediction':
        systemPrompt = `You are a plot analysis expert. Predict future story developments based on:
        - Current plot threads and foreshadowing
        - Character arcs and development patterns
        - Author's writing style and previous works
        - Established world-building rules
        Provide multiple scenarios with probability assessments.`;
        break;

      case 'improve_theory':
        systemPrompt = `You are an editor helping improve anime/manga theories. Review the provided theory and suggest:
        - Stronger evidence and supporting details
        - Better structure and flow
        - Additional perspectives to consider
        - Potential counterarguments to address
        Maintain the original voice while enhancing clarity and depth.`;
        
        if (context) {
          userPrompt = `Original theory: ${context}\n\nImprovement request: ${prompt}`;
        }
        break;

      default:
        systemPrompt = `You are a helpful assistant specializing in anime and manga content. 
        Provide accurate, engaging responses about anime, manga, characters, theories, and related topics.`;
    }

    // Add context if provided (e.g., existing theory content)
    if (context && action !== 'improve_theory') {
      userPrompt = `Context: ${context}\n\nRequest: ${prompt}`;
    }

    // AI functionality moved to n8n workflows
    // This is a placeholder response until n8n integration is complete
    const aiResponse = `🤖 AI Response (n8n Integration Coming Soon)

Hi! The AI functionality has been moved to our n8n workflow system for better automation and integration.

**Your Request:** ${action}
**Prompt:** ${prompt}

**What we're working on:**
- Automated theory generation through n8n workflows
- AI-powered content enhancement
- Community-driven theory validation
- Advanced anime/manga analysis

**For now:** You can still create and edit theories manually, and our community features are fully functional!

**Coming soon:** Full n8n AI integration with enhanced capabilities.`;

    if (!aiResponse) {
      return res.status(500).json({ error: 'Failed to generate AI response' });
    }

    // Placeholder for AI usage logging (n8n will handle this)
    await supabase
      .from('ai_usage')
      .insert({
        user_id: session.user.id,
        action,
        prompt: prompt.substring(0, 500),
        tokens_used: 0, // n8n will track this
        theory_id: theoryId || null,
        created_at: new Date().toISOString()
      })
      .select()
      .catch(() => null); // Fail silently if table doesn't exist yet

    return res.status(200).json({
      response: aiResponse,
      tokensUsed: 0,
      remainingRequests: dailyLimit - dailyUsage - 1
    });

  } catch (error) {
    console.error('AI request error:', error);
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'OpenAI rate limit exceeded. Please try again later.' 
      });
    }
    
    if (error.response?.status === 401) {
      return res.status(500).json({ 
        error: 'AI service configuration error' 
      });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}
