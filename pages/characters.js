import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, useInView } from 'framer-motion';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const contentInView = useInView(contentRef, { once: true });

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    filterCharacters();
  }, [characters, selectedSeries, searchTerm]);

  const loadCharacters = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockCharacters = [
        {
          id: 1,
          name: "Monkey D. Luffy",
          series: "One Piece",
          description: "Captain of the Straw Hat Pirates and aspiring Pirate King",
          abilities: ["Gum-Gum Fruit", "Haki", "Gear Transformations"],
          image: null,
          popularity: 95
        },
        {
          id: 2,
          name: "Yuji Itadori",
          series: "Jujutsu Kaisen",
          description: "High school student who becomes host to Sukuna",
          abilities: ["Sukuna's Power", "Physical Strength", "Cursed Energy"],
          image: null,
          popularity: 88
        },
        {
          id: 3,
          name: "Tanjiro Kamado",
          series: "Demon Slayer",
          description: "Demon Slayer seeking to cure his sister Nezuko",
          abilities: ["Water Breathing", "Sun Breathing", "Enhanced Senses"],
          image: null,
          popularity: 92
        },
        {
          id: 4,
          name: "Izuku Midoriya",
          series: "My Hero Academia",
          description: "Hero-in-training with One For All quirk",
          abilities: ["One For All", "Full Cowling", "Analytical Mind"],
          image: null,
          popularity: 85
        },
        {
          id: 5,
          name: "Edward Elric",
          series: "Fullmetal Alchemist",
          description: "State Alchemist searching for the Philosopher's Stone",
          abilities: ["Alchemy", "Combat Skills", "Strategic Thinking"],
          image: null,
          popularity: 90
        },
        {
          id: 6,
          name: "Goku",
          series: "Dragon Ball",
          description: "Saiyan warrior protecting Earth",
          abilities: ["Super Saiyan", "Kamehameha", "Ultra Instinct"],
          image: null,
          popularity: 98
        }
      ];
      
      setCharacters(mockCharacters);
    } catch (error) {
      console.error('Failed to load characters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterCharacters = () => {
    let filtered = characters;
    
    if (selectedSeries !== 'all') {
      filtered = filtered.filter(char => char.series === selectedSeries);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(char => 
        char.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        char.series.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCharacters(filtered);
  };

  const getSeriesList = () => {
    const series = [...new Set(characters.map(char => char.series))];
    return series.sort();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Head>
        <title>Character Database - Shonen Ark</title>
        <meta name="description" content="Explore detailed profiles of your favorite anime and manga characters." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <motion.header 
          ref={headerRef}
          className="bg-gradient-to-r from-dark-purple/80 to-purple/80 py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              variants={itemVariants}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
            >
              <div className="text-6xl mb-4">👥</div>
              <h1 className="text-4xl font-bold mystical-title mb-4 glow-text">
                Character Database
              </h1>
              <p className="text-xl text-grey brush-font max-w-2xl mx-auto">
                Discover detailed profiles, abilities, and stories of iconic anime and manga characters
              </p>
            </motion.div>
          </div>
        </motion.header>

        {/* Filters */}
        <section className="py-8 border-b border-grey/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search characters or series..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-dark-purple/30 border border-purple/30 rounded-lg text-white placeholder-grey focus:outline-none focus:border-purple"
                />
              </div>
              
              {/* Series Filter */}
              <div className="flex items-center space-x-4">
                <span className="text-grey">Filter by series:</span>
                <select
                  value={selectedSeries}
                  onChange={(e) => setSelectedSeries(e.target.value)}
                  className="px-4 py-2 bg-dark-purple/30 border border-purple/30 rounded-lg text-white focus:outline-none focus:border-purple"
                >
                  <option value="all">All Series</option>
                  {getSeriesList().map(series => (
                    <option key={series} value={series}>{series}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <motion.section 
          ref={contentRef}
          className="py-12"
          variants={containerVariants}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <motion.div 
                  className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : filteredCharacters.length > 0 ? (
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {filteredCharacters.map((character) => (
                  <motion.article
                    key={character.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, rotateY: 2 }}
                    className="bg-dark-purple/30 rounded-lg p-6 border border-purple/20 hover:border-purple/50 transition-all duration-300 shrine-glow"
                  >
                    {/* Character Image */}
                    <div className="w-full h-48 rounded-lg mb-4 overflow-hidden">
                      {character.image ? (
                        <img 
                          src={character.image}
                          alt={character.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple/20 to-dark-purple/20 flex items-center justify-center">
                          <span className="text-4xl">👤</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Character Info */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 mystical-title">
                        {character.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-purple font-semibold">
                          {character.series}
                        </span>
                        <div className="flex items-center text-yellow-400">
                          <span className="mr-1">⭐</span>
                          <span className="text-sm">{character.popularity}%</span>
                        </div>
                      </div>
                      
                      <p className="text-grey text-sm mb-4 line-clamp-3">
                        {character.description}
                      </p>
                      
                      {/* Abilities */}
                      <div>
                        <h4 className="text-purple font-semibold mb-2 text-sm">Abilities:</h4>
                        <div className="flex flex-wrap gap-1">
                          {character.abilities.slice(0, 3).map((ability, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-purple/20 text-purple px-2 py-1 rounded"
                            >
                              {ability}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-16"
                variants={itemVariants}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-grey mb-4">No characters found</h3>
                <p className="text-grey">Try adjusting your search or filter criteria</p>
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </>
  );
}
