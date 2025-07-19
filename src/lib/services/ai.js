// AI Utilities for Shonen Ark
// OpenAI integration for content tagging and moderation

/**
 * Auto-tag content using OpenAI
 * @param {string} text - Content to analyze
 * @returns {Promise<string[]>} Array of suggested tags
 */
export async function autoTagContent(text) {
  try {
    // Mock implementation - replace with actual OpenAI API call
    const response = await fetch('/api/ai/auto-tag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to auto-tag content');
    }

    const data = await response.json();
    return data.tags || [];
  } catch (error) {
    console.error('Auto-tagging failed:', error);
    
    // Fallback: Simple keyword extraction
    return extractBasicTags(text);
  }
}

/**
 * Flag content for moderation using AI
 * @param {string} text - Content to check
 * @returns {Promise<{isAppropriate: boolean, reason?: string, confidence: number}>}
 */
export async function flagContent(text) {
  try {
    const response = await fetch('/api/ai/moderate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to moderate content');
    }

    const data = await response.json();
    return {
      isAppropriate: data.isAppropriate,
      reason: data.reason,
      confidence: data.confidence
    };
  } catch (error) {
    console.error('Content moderation failed:', error);
    
    // Fallback: Basic keyword checking
    return basicContentCheck(text);
  }
}

/**
 * Generate theory suggestions based on anime/manga
 * @param {string} animeName - Name of the anime/manga
 * @param {string} context - Additional context
 * @returns {Promise<string[]>} Array of theory suggestions
 */
export async function generateTheorySuggestions(animeName, context = '') {
  try {
    const response = await fetch('/api/ai/theory-suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ animeName, context }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate theory suggestions');
    }

    const data = await response.json();
    return data.suggestions || [];
  } catch (error) {
    console.error('Theory generation failed:', error);
    
    // Fallback suggestions
    return [
      `Hidden symbolism in ${animeName}`,
      `Character development predictions for ${animeName}`,
      `Plot theory: What happens next in ${animeName}`
    ];
  }
}

/**
 * Extract anime/manga names from text
 * @param {string} text - Text to analyze
 * @returns {string[]} Array of detected anime/manga names
 */
export function extractAnimeReferences(text) {
  // Common anime/manga names for detection
  const animeList = [
    'One Piece', 'Naruto', 'Dragon Ball', 'Attack on Titan', 'My Hero Academia',
    'Demon Slayer', 'Jujutsu Kaisen', 'Chainsaw Man', 'Bleach', 'Hunter x Hunter',
    'Death Note', 'Fullmetal Alchemist', 'Tokyo Ghoul', 'Mob Psycho', 'One Punch Man'
  ];

  const detected = [];
  const lowerText = text.toLowerCase();

  animeList.forEach(anime => {
    if (lowerText.includes(anime.toLowerCase())) {
      detected.push(anime);
    }
  });

  return detected;
}

// Fallback functions for when AI services are unavailable

function extractBasicTags(text) {
  const keywords = [
    'theory', 'analysis', 'character', 'plot', 'anime', 'manga',
    'power', 'ability', 'fight', 'battle', 'mystery', 'secret',
    'prediction', 'spoiler', 'review', 'discussion'
  ];

  const lowerText = text.toLowerCase();
  return keywords.filter(keyword => lowerText.includes(keyword));
}

function basicContentCheck(text) {
  const inappropriateKeywords = [
    'spam', 'hate', 'inappropriate', 'offensive'
  ];

  const lowerText = text.toLowerCase();
  const hasInappropriateContent = inappropriateKeywords.some(keyword => 
    lowerText.includes(keyword)
  );

  return {
    isAppropriate: !hasInappropriateContent,
    reason: hasInappropriateContent ? 'Contains potentially inappropriate content' : null,
    confidence: 0.7
  };
}

// Quality scoring for content
export function scoreContentQuality(text) {
  let score = 0;
  
  // Length check
  if (text.length > 100) score += 20;
  if (text.length > 500) score += 20;
  
  // Anime references
  const animeRefs = extractAnimeReferences(text);
  score += Math.min(animeRefs.length * 10, 30);
  
  // Structure check (paragraphs, punctuation)
  const sentences = text.split(/[.!?]+/).length;
  if (sentences > 3) score += 15;
  
  // Originality indicators
  if (text.includes('theory') || text.includes('analysis')) score += 15;
  
  return Math.min(score, 100);
}

export default {
  autoTagContent,
  flagContent,
  generateTheorySuggestions,
  extractAnimeReferences,
  scoreContentQuality
};
