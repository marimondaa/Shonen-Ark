// Centralized mock data for Shonen Ark platform
// Following README blueprint specifications

export const mockTheories = [
  {
    id: 1,
    title: "Luffy's Gear 6: The Ultimate Freedom Theory",
    creator: "TheoryMaster2024",
    image: "/api/placeholder/400/300",
    tags: ["one-piece", "luffy", "gear-6", "power-scaling"],
    blurb: "Evidence suggests Luffy's final transformation combines all previous gears with advanced Haki mastery, representing true freedom.",
    spoiler: true,
    anime: "One Piece",
    likes: 2847,
    comments: 189,
    views: 15200,
    uploadDate: "2025-01-15T10:30:00Z",
    content: "After analyzing the latest chapters, I believe Luffy's Gear 6 will represent the pinnacle of Devil Fruit awakening...",
    isPremium: false
  },
  {
    id: 2,
    title: "Sukuna's True Plan: The Heian Era Connection",
    creator: "JujutsuAnalyst",
    image: "/api/placeholder/400/300",
    tags: ["jujutsu-kaisen", "sukuna", "heian-era", "theory"],
    blurb: "Sukuna's actions aren't random - they're part of a 1000-year plan to resurrect the golden age of jujutsu.",
    spoiler: true,
    anime: "Jujutsu Kaisen",
    likes: 1923,
    comments: 234,
    views: 8900,
    uploadDate: "2025-01-12T14:22:00Z",
    content: "The King of Curses has been methodically recreating conditions from the Heian period...",
    isPremium: true
  },
  {
    id: 3,
    title: "Attack on Titan's Hidden Time Loop",
    creator: "EldianScholar",
    image: "/api/placeholder/400/300",
    tags: ["attack-on-titan", "time-loop", "eren", "paths"],
    blurb: "The Paths dimension creates an endless cycle - Eren has lived through these events countless times.",
    spoiler: true,
    anime: "Attack on Titan",
    likes: 3421,
    comments: 567,
    views: 22100,
    uploadDate: "2025-01-10T09:15:00Z",
    content: "By examining the mechanics of the Paths, we can see evidence of temporal recursion...",
    isPremium: false
  },
  {
    id: 4,
    title: "Demon Slayer: Tanjiro's Sun Breathing Evolution",
    creator: "BreathingExpert",
    image: "/api/placeholder/400/300",
    tags: ["demon-slayer", "sun-breathing", "tanjiro", "hinokami"],
    blurb: "Tanjiro's unique physiology allows him to evolve Sun Breathing beyond what Yoriichi achieved.",
    spoiler: false,
    anime: "Demon Slayer",
    likes: 1456,
    comments: 98,
    views: 7800,
    uploadDate: "2025-01-08T16:45:00Z",
    content: "The dance of the fire god holds secrets that even Yoriichi didn't fully unlock...",
    isPremium: false
  }
];

export const mockCharacters = [
  {
    id: 1,
    name: "Monkey D. Luffy",
    anime: "One Piece",
    image: "/api/placeholder/300/400",
    powerLevel: 9.2,
    rank: "#1",
    description: "Captain of the Straw Hat Pirates with rubber powers and incredible Haki mastery.",
    abilities: ["Gear 5", "Advanced Conqueror's Haki", "Awakened Devil Fruit"],
    bounty: "3,000,000,000 Berry",
    status: "Active"
  },
  {
    id: 2,
    name: "Goku",
    anime: "Dragon Ball Z",
    image: "/api/placeholder/300/400",
    powerLevel: 9.8,
    rank: "#2",
    description: "Saiyan warrior with Ultra Instinct and god-level ki manipulation.",
    abilities: ["Ultra Instinct", "Super Saiyan Blue", "Instant Transmission"],
    powerSystem: "Ki/God Ki",
    status: "Active"
  },
  {
    id: 3,
    name: "Saitama",
    anime: "One Punch Man",
    image: "/api/placeholder/300/400",
    powerLevel: 10.0,
    rank: "#3",
    description: "Hero for fun who can defeat any enemy with a single punch.",
    abilities: ["Limitless Strength", "Invulnerability", "Super Speed"],
    heroRank: "B-Class",
    status: "Active"
  }
];

export const mockCalendarData = {
  anime: [
    {
      id: 1,
      title: "One Piece",
      cover: "/api/placeholder/200/300",
      nextEpisode: 1098,
      releaseDate: "2025-01-21T09:30:00Z",
      description: "Luffy and the crew face off against the World Government's final gambit.",
      status: "ongoing",
      totalEpisodes: "1000+",
      studio: "Toei Animation"
    },
    {
      id: 2,
      title: "Jujutsu Kaisen Season 3",
      cover: "/api/placeholder/200/300",
      nextEpisode: 1,
      releaseDate: "2025-02-15T10:00:00Z",
      description: "The Culling Game arc brings unprecedented chaos to the jujutsu world.",
      status: "upcoming",
      totalEpisodes: "TBA",
      studio: "MAPPA"
    },
    {
      id: 3,
      title: "Demon Slayer: Infinity Castle",
      cover: "/api/placeholder/200/300",
      nextEpisode: 1,
      releaseDate: "2025-03-10T11:00:00Z",
      description: "The final battle against Muzan begins in his twisted castle.",
      status: "upcoming",
      totalEpisodes: "12",
      studio: "Ufotable"
    }
  ],
  manga: [
    {
      id: 1,
      title: "One Piece",
      cover: "/api/placeholder/200/300",
      nextChapter: 1105,
      releaseDate: "2025-01-19T12:00:00Z",
      description: "The truth about the Void Century is finally revealed.",
      status: "ongoing",
      totalChapters: "1100+",
      author: "Eiichiro Oda"
    },
    {
      id: 2,
      title: "My Hero Academia",
      cover: "/api/placeholder/200/300",
      nextChapter: 412,
      releaseDate: "2025-01-20T14:30:00Z",
      description: "Deku faces his greatest challenge in the final war.",
      status: "ongoing",
      totalChapters: "410+",
      author: "Kohei Horikoshi"
    },
    {
      id: 3,
      title: "Chainsaw Man Part 2",
      cover: "/api/placeholder/200/300",
      nextChapter: 150,
      releaseDate: "2025-01-22T13:00:00Z",
      description: "Denji navigates his new life while new devils emerge.",
      status: "ongoing",
      totalChapters: "149",
      author: "Tatsuki Fujimoto"
    }
  ]
};

export const mockDiscoveryContent = {
  'fan-fights': [
    {
      id: 1,
      title: "Naruto vs Sasuke: Final Valley Reimagined",
      creator: "AnimeFighter99",
      thumbnail: "/api/placeholder/400/225",
      type: "video",
      duration: "12:34",
      likes: 15200,
      comments: 890,
      views: 89000,
      uploadDate: "2025-01-15T10:30:00Z",
      tags: ["naruto", "sasuke", "final-valley", "animation"],
      description: "A complete remake of the iconic final battle with modern animation techniques."
    },
    {
      id: 2,
      title: "Goku vs Saitama: The Ultimate Showdown",
      creator: "PowerScaler",
      thumbnail: "/api/placeholder/400/225",
      type: "video",
      duration: "8:45",
      likes: 23400,
      comments: 1200,
      views: 156000,
      uploadDate: "2025-01-12T14:22:00Z",
      tags: ["goku", "saitama", "crossover", "power-scaling"],
      description: "Fan-animated battle between two of anime's strongest characters."
    }
  ],
  'audio-fx': [
    {
      id: 1,
      title: "Kamehameha Sound Effect Collection",
      creator: "SoundMaster",
      thumbnail: "/api/placeholder/400/225",
      type: "audio",
      duration: "5:23",
      likes: 8900,
      comments: 234,
      views: 34000,
      uploadDate: "2025-01-14T11:15:00Z",
      tags: ["dbz", "kamehameha", "sound-effects"],
      description: "High-quality recreation of iconic Dragon Ball energy attacks."
    },
    {
      id: 2,
      title: "One Piece Soundtrack Remix",
      creator: "MelodyOtaku",
      thumbnail: "/api/placeholder/400/225",
      type: "audio",
      duration: "3:45",
      likes: 5600,
      comments: 167,
      views: 28000,
      uploadDate: "2025-01-11T09:30:00Z",
      tags: ["one-piece", "soundtrack", "remix"],
      description: "Epic orchestral remix of 'We Are!' opening theme."
    }
  ],
  'character-designs': [
    {
      id: 1,
      title: "Original Demon Slayer Character Design",
      creator: "ArtMaster2024",
      thumbnail: "/api/placeholder/400/225",
      type: "image",
      duration: null,
      likes: 12300,
      comments: 445,
      views: 67000,
      uploadDate: "2025-01-13T16:45:00Z",
      tags: ["demon-slayer", "original-character", "design"],
      description: "Custom demon slayer with unique breathing technique design."
    },
    {
      id: 2,
      title: "Jujutsu Kaisen OC: Cursed Technique Concept",
      creator: "DesignGenius",
      thumbnail: "/api/placeholder/400/225",
      type: "image",
      duration: null,
      likes: 9800,
      comments: 321,
      views: 45000,
      uploadDate: "2025-01-10T13:20:00Z",
      tags: ["jujutsu-kaisen", "oc", "cursed-technique"],
      description: "Original character with time manipulation cursed technique."
    }
  ]
};

export const mockUserActivity = [
  {
    id: 1,
    type: "comment",
    content: "Amazing theory about Luffy's final form!",
    target: "Luffy's Gear 6 Theory",
    timestamp: "2025-01-16T10:30:00Z",
    targetId: 1,
    targetType: "theory"
  },
  {
    id: 2,
    type: "like",
    target: "Sukuna's True Plan Analysis",
    timestamp: "2025-01-15T15:45:00Z",
    targetId: 2,
    targetType: "theory"
  },
  {
    id: 3,
    type: "bookmark",
    target: "Attack on Titan Time Loop Theory",
    timestamp: "2025-01-14T09:20:00Z",
    targetId: 3,
    targetType: "theory"
  },
  {
    id: 4,
    type: "upload",
    target: "Original Character Design",
    timestamp: "2025-01-13T14:10:00Z",
    targetId: 1,
    targetType: "upload"
  }
];

export const mockSubscriptions = [
  {
    id: 1,
    creator: "TheoryMaster2024",
    avatar: "/api/placeholder/50/50",
    latestContent: "Luffy's Final Gear Theory",
    subscribers: 15600,
    tier: "premium",
    nextPayment: "2025-02-15",
    subscriptionDate: "2024-12-15"
  },
  {
    id: 2,
    creator: "AnimationPro",
    avatar: "/api/placeholder/50/50",
    latestContent: "Naruto Hidden Powers Analysis",
    subscribers: 8900,
    tier: "basic",
    nextPayment: "2025-02-10",
    subscriptionDate: "2024-11-20"
  }
];

export const mockBookmarks = [
  {
    id: 1,
    title: "One Piece Final Arc Predictions",
    creator: "TheoryMaster2024",
    thumbnail: "/api/placeholder/300/200",
    bookmarkedAt: "2025-01-15T12:00:00Z",
    category: "theory",
    type: "theory"
  },
  {
    id: 2,
    title: "Demon Slayer Power System Explained",
    creator: "PowerScaler",
    thumbnail: "/api/placeholder/300/200",
    bookmarkedAt: "2025-01-12T16:30:00Z",
    category: "analysis",
    type: "theory"
  },
  {
    id: 3,
    title: "Epic Fight Animation",
    creator: "AnimeFighter99",
    thumbnail: "/api/placeholder/300/200",
    bookmarkedAt: "2025-01-10T14:15:00Z",
    category: "fan-fights",
    type: "upload"
  }
];

// Utility functions for filtering and sorting
export const filterTheoriesByAnime = (theories, anime) => {
  if (!anime || anime === 'all') return theories;
  return theories.filter(theory => theory.anime.toLowerCase().includes(anime.toLowerCase()));
};

export const sortContent = (content, sortBy) => {
  switch (sortBy) {
    case 'newest':
      return [...content].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    case 'oldest':
      return [...content].sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
    case 'popular':
      return [...content].sort((a, b) => b.likes - a.likes);
    case 'trending':
      return [...content].sort((a, b) => b.views - a.views);
    default:
      return content;
  }
};

export const getUpcomingReleases = (calendarData, days = 7) => {
  const now = new Date();
  const upcoming = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
  
  const upcomingAnime = calendarData.anime.filter(item => {
    const releaseDate = new Date(item.releaseDate);
    return releaseDate >= now && releaseDate <= upcoming;
  });
  
  const upcomingManga = calendarData.manga.filter(item => {
    const releaseDate = new Date(item.releaseDate);
    return releaseDate >= now && releaseDate <= upcoming;
  });
  
  return { anime: upcomingAnime, manga: upcomingManga };
};

// Calendar Data
export const getCalendarData = () => [
  // Anime Releases
  {
    id: 1,
    title: "Attack on Titan: Final Season",
    type: "anime",
    episode: 12,
    totalEpisodes: 24,
    releaseDate: "2025-07-20",
    time: "16:00 JST",
    status: "airing",
    rating: 9.0,
    views: "2.5M",
    studio: "WIT Studio",
    genre: "Action, Drama",
    description: "The epic conclusion to humanity's fight against the titans reaches its climax.",
    tags: ["Shounen", "Military", "Supernatural", "Thriller"]
  },
  {
    id: 2,
    title: "Demon Slayer: Infinity Castle Arc",
    type: "anime",
    episode: 8,
    totalEpisodes: 12,
    releaseDate: "2025-07-22",
    time: "23:15 JST",
    status: "airing",
    rating: 8.8,
    views: "1.8M",
    studio: "Ufotable",
    genre: "Action, Supernatural",
    description: "Tanjiro and the Demon Slayer Corps face their ultimate challenge in the Infinity Castle.",
    tags: ["Shounen", "Historical", "Supernatural"]
  },
  {
    id: 3,
    title: "One Piece",
    type: "anime",
    episode: 1089,
    totalEpisodes: "Ongoing",
    releaseDate: "2025-07-21",
    time: "09:30 JST",
    status: "ongoing",
    rating: 9.2,
    views: "3.2M",
    studio: "Toei Animation",
    genre: "Adventure, Comedy",
    description: "The Straw Hat Pirates continue their journey through the Grand Line.",
    tags: ["Shounen", "Adventure", "Comedy", "Pirate"]
  },
  {
    id: 4,
    title: "Jujutsu Kaisen Season 3",
    type: "anime",
    episode: 4,
    totalEpisodes: 24,
    releaseDate: "2025-07-25",
    time: "00:30 JST",
    status: "upcoming",
    rating: 8.9,
    views: "2.1M",
    studio: "MAPPA",
    genre: "Action, School",
    description: "Yuji and his friends face new threats in the world of jujutsu sorcery.",
    tags: ["Shounen", "School", "Supernatural", "Action"]
  },
  // Manga Releases
  {
    id: 5,
    title: "One Piece",
    type: "manga",
    chapter: 1102,
    totalChapters: "Ongoing",
    releaseDate: "2025-07-23",
    status: "ongoing",
    rating: 9.3,
    views: "4.1M",
    studio: "Shueisha",
    genre: "Adventure, Comedy",
    description: "The latest chapter reveals more about the final saga of the Grand Line adventure.",
    tags: ["Shounen", "Adventure", "Pirate", "Comedy"]
  },
  {
    id: 6,
    title: "Jujutsu Kaisen",
    type: "manga",
    chapter: 245,
    totalChapters: "Ongoing",
    releaseDate: "2025-07-24",
    status: "ongoing",
    rating: 8.7,
    views: "1.9M",
    studio: "Shueisha",
    genre: "Action, School",
    description: "The Culling Game reaches a critical turning point in this intense chapter.",
    tags: ["Shounen", "School", "Supernatural", "Dark"]
  },
  {
    id: 7,
    title: "My Hero Academia",
    type: "manga",
    chapter: 412,
    totalChapters: "Ongoing",
    releaseDate: "2025-07-26",
    status: "ongoing",
    rating: 8.5,
    views: "1.7M",
    studio: "Shueisha",
    genre: "Superhero, School",
    description: "The final battle between heroes and villains intensifies.",
    tags: ["Shounen", "School", "Superhero", "Action"]
  },
  {
    id: 8,
    title: "Chainsaw Man Part 2",
    type: "manga",
    chapter: 152,
    totalChapters: "Ongoing",
    releaseDate: "2025-07-27",
    status: "ongoing",
    rating: 8.9,
    views: "2.3M",
    studio: "Shogakukan",
    genre: "Action, Horror",
    description: "Denji's story continues with new devils and darker themes.",
    tags: ["Seinen", "Horror", "Action", "Psychological"]
  }
];

export const filterCalendarByType = (data, type) => {
  if (type === 'all') return data;
  return data.filter(item => item.type === type);
};

// Creator Dashboard Data
export const getCreatorStats = () => ({
  subscribers: 156,
  totalViews: 2847,
  totalUploads: 12,
  monthlyRevenue: 48,
  avgEngagement: 85,
  topPerformingContent: 'One Piece Theory: The True Nature of Devil Fruits'
});

export const getCreatorContent = () => [
  {
    id: 1,
    title: "One Piece Theory: The True Nature of Devil Fruits",
    type: "theory",
    views: 245,
    likes: 34,
    uploadDate: "2 days ago",
    status: "published",
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: 2,
    title: "Naruto vs Sasuke Animation Recreation",
    type: "animation",
    views: 567,
    likes: 89,
    uploadDate: "1 week ago",
    status: "published",
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: 3,
    title: "Attack on Titan OST Remix",
    type: "audio",
    views: 189,
    likes: 23,
    uploadDate: "3 days ago",
    status: "published",
    thumbnail: '/api/placeholder/300/200'
  },
  {
    id: 4,
    title: "Demon Slayer Character Redesign",
    type: "artwork",
    views: 334,
    likes: 67,
    uploadDate: "5 days ago",
    status: "published",
    thumbnail: '/api/placeholder/300/200'
  }
];
