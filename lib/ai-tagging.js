// AI Auto-tagging service using OpenAI
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Main auto-tagging function
export async function generateTags(content, contentType = 'theory') {
  try {
    const prompt = createTaggingPrompt(content, contentType);
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert in anime and manga content categorization. Generate relevant tags for anime/manga content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.3,
    });

    const tagsText = response.choices[0].message.content;
    const tags = parseTags(tagsText);
    
    return {
      success: true,
      tags,
      confidence: 0.85 // Could be calculated based on response
    };
  } catch (error) {
    console.error('AI tagging failed:', error);
    return {
      success: false,
      tags: [],
      error: error.message
    };
  }
}

// Content moderation function
export async function moderateContent(content, contentType = 'theory') {
  try {
    const moderation = await openai.moderations.create({
      input: content,
    });

    const result = moderation.results[0];
    
    return {
      flagged: result.flagged,
      categories: result.categories,
      category_scores: result.category_scores,
      confidence: Math.max(...Object.values(result.category_scores))
    };
  } catch (error) {
    console.error('Content moderation failed:', error);
    return {
      flagged: false,
      error: error.message
    };
  }
}

function createTaggingPrompt(content, contentType) {
  const basePrompt = `Analyze this ${contentType} content and generate 3-8 relevant tags. Focus on:
- Anime/manga series mentioned
- Character names
- Themes (action, romance, mystery, etc.)
- Genres (shonen, seinen, shoujo, etc.)
- Content type (theory, fan-art, discussion, etc.)

Content: "${content}"

Return only the tags as a comma-separated list, no explanations.`;

  return basePrompt;
}

function parseTags(tagsText) {
  return tagsText
    .split(',')
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0 && tag.length < 30)
    .slice(0, 8); // Max 8 tags
}

// Batch processing for multiple content items
export async function batchGenerateTags(contentItems) {
  const results = [];
  
  for (const item of contentItems) {
    const result = await generateTags(item.content, item.type);
    results.push({
      id: item.id,
      ...result
    });
    
    // Rate limiting - wait 100ms between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return results;
}
