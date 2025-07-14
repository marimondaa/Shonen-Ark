/**
 * Database utilities for Shonen Ark
 * Handles data operations with Supabase/Firestore
 */

// Mock database for development - replace with actual Supabase client in production
let mockDatabase = {
  theories: [
    {
      id: '1',
      title: 'The True Power Behind Sukuna\'s Curse Technique',
      content: 'In Jujutsu Kaisen, Sukuna\'s Malevolent Shrine technique might be connected to...',
      author: 'AnimeTheorist99',
      tags: ['jujutsu-kaisen', 'sukuna', 'theory'],
      createdAt: new Date('2024-12-01'),
      likes: 234,
      comments: 45,
      views: 1250,
      hasSpoilers: true
    },
    {
      id: '2',
      title: 'One Piece: The Real Identity of Im-sama',
      content: 'Evidence suggests that Im-sama might actually be related to the Void Century...',
      author: 'PirateKingFan',
      tags: ['one-piece', 'im-sama', 'void-century'],
      createdAt: new Date('2024-11-28'),
      likes: 567,
      comments: 89,
      views: 2100,
      hasSpoilers: false
    }
  ],
  users: [
    {
      id: 'user1',
      username: 'AnimeTheorist99',
      email: 'theorist@email.com',
      accountType: 'creator',
      followers: 1250,
      following: 45,
      createdAt: new Date('2024-10-15'),
      isVerified: true
    }
  ],
  uploads: [
    {
      id: 'upload1',
      type: 'video',
      category: 'fan-fights',
      title: 'Goku vs Saitama - Animation',
      author: 'AnimatorPro',
      url: '/uploads/video1.mp4',
      thumbnail: '/uploads/thumb1.jpg',
      likes: 890,
      views: 5600,
      createdAt: new Date('2024-11-20')
    }
  ]
};

/**
 * Fetch theories with optional filtering
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>} - Array of theories
 */
export async function getTheories(filters = {}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let theories = [...mockDatabase.theories];
  
  // Apply filters
  if (filters.anime) {
    theories = theories.filter(theory => 
      theory.tags.some(tag => tag.includes(filters.anime.toLowerCase()))
    );
  }
  
  if (filters.sortBy === 'newest') {
    theories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (filters.sortBy === 'popular') {
    theories.sort((a, b) => b.likes - a.likes);
  } else if (filters.sortBy === 'trending') {
    theories.sort((a, b) => b.views - a.views);
  }
  
  if (filters.limit) {
    theories = theories.slice(0, filters.limit);
  }
  
  return theories;
}

/**
 * Get a single theory by ID
 * @param {string} id - Theory ID
 * @returns {Promise<Object|null>} - Theory object or null
 */
export async function getTheoryById(id) {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockDatabase.theories.find(theory => theory.id === id) || null;
}

/**
 * Create a new theory
 * @param {Object} theoryData - Theory data
 * @returns {Promise<Object>} - Created theory
 */
export async function createTheory(theoryData) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newTheory = {
    id: Date.now().toString(),
    ...theoryData,
    createdAt: new Date(),
    likes: 0,
    comments: 0,
    views: 0
  };
  
  mockDatabase.theories.push(newTheory);
  return newTheory;
}

/**
 * Get uploads by category
 * @param {string} category - Upload category (fan-fights, audio-fx, character-designs)
 * @param {Object} options - Options for pagination, etc.
 * @returns {Promise<Array>} - Array of uploads
 */
export async function getUploadsByCategory(category, options = {}) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let uploads = mockDatabase.uploads.filter(upload => upload.category === category);
  
  if (options.limit) {
    uploads = uploads.slice(0, options.limit);
  }
  
  return uploads;
}

/**
 * Upload new content
 * @param {Object} uploadData - Upload data
 * @returns {Promise<Object>} - Created upload
 */
export async function createUpload(uploadData) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newUpload = {
    id: Date.now().toString(),
    ...uploadData,
    createdAt: new Date(),
    likes: 0,
    views: 0
  };
  
  mockDatabase.uploads.push(newUpload);
  return newUpload;
}

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} - User object or null
 */
export async function getUserProfile(userId) {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockDatabase.users.find(user => user.id === userId) || null;
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} - Updated user
 */
export async function updateUserProfile(userId, updateData) {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const userIndex = mockDatabase.users.findIndex(user => user.id === userId);
  if (userIndex === -1) throw new Error('User not found');
  
  mockDatabase.users[userIndex] = {
    ...mockDatabase.users[userIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  return mockDatabase.users[userIndex];
}

/**
 * Get anime release calendar data
 * @param {string} type - 'anime' or 'manga'
 * @returns {Promise<Array>} - Array of releases
 */
export async function getCalendarData(type = 'anime') {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Mock calendar data - in production, fetch from AniList API
  const mockReleases = [
    {
      id: 'jjk-s3',
      title: 'Jujutsu Kaisen Season 3',
      type: 'anime',
      coverImage: '/images/anime/jjk-cover.jpg',
      description: 'The Culling Game arc begins with intense battles and new characters.',
      nextEpisode: {
        number: 12,
        airDate: new Date('2025-01-15'),
        title: 'The Strongest Sorcerer'
      },
      totalEpisodes: 24,
      status: 'releasing'
    },
    {
      id: 'op-manga',
      title: 'One Piece',
      type: 'manga',
      coverImage: '/images/manga/op-cover.jpg',
      description: 'The Straw Hats continue their journey in the Final Saga.',
      nextChapter: {
        number: 1105,
        releaseDate: new Date('2025-01-12'),
        title: 'The Ancient Robot\'s Secret'
      },
      status: 'releasing'
    }
  ];
  
  return mockReleases.filter(release => release.type === type);
}

/**
 * Search content across the platform
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Promise<Object>} - Search results
 */
export async function searchContent(query, options = {}) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const queryLower = query.toLowerCase();
  
  const theoriesResults = mockDatabase.theories.filter(theory =>
    theory.title.toLowerCase().includes(queryLower) ||
    theory.content.toLowerCase().includes(queryLower) ||
    theory.tags.some(tag => tag.includes(queryLower))
  );
  
  const uploadsResults = mockDatabase.uploads.filter(upload =>
    upload.title.toLowerCase().includes(queryLower)
  );
  
  return {
    theories: theoriesResults,
    uploads: uploadsResults,
    totalResults: theoriesResults.length + uploadsResults.length,
    query
  };
}

/**
 * Get trending content
 * @returns {Promise<Object>} - Trending theories and uploads
 */
export async function getTrendingContent() {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const trendingTheories = mockDatabase.theories
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  
  const trendingUploads = mockDatabase.uploads
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  
  return {
    theories: trendingTheories,
    uploads: trendingUploads
  };
}

// Export all functions
export default {
  getTheories,
  getTheoryById,
  createTheory,
  getUploadsByCategory,
  createUpload,
  getUserProfile,
  updateUserProfile,
  getCalendarData,
  searchContent,
  getTrendingContent
};
