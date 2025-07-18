import { motion } from 'framer-motion';
import Link from 'next/link';

const ShrineHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-black">
      {/* Animated Torii Gate Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img 
            src="/assets/illustrations/shrine-ink-hero.png" 
            alt="" 
            className="w-full h-full object-cover opacity-30 blur-sm"
          />
        </motion.div>
        
        {/* Animated Fog Layers */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-sumi-gray opacity-60"
          animate={{ 
            background: [
              "linear-gradient(to top, #0a0a0a 0%, transparent 50%, #2b2b2b 100%)",
              "linear-gradient(to top, #0a0a0a 10%, transparent 60%, #2b2b2b 90%)",
              "linear-gradient(to top, #0a0a0a 0%, transparent 50%, #2b2b2b 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Ink Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-line-highlight rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}

        {/* Qi Energy Particles flowing to logo */}
        {Array.from({ length: 8 }).map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const angle = Math.atan2(50 - startY, 50 - startX); // Calculate angle to center
          
          return (
            <motion.div
              key={`qi-${i}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                background: `radial-gradient(circle, rgba(147, 51, 234, 0.8) 0%, rgba(147, 51, 234, 0.4) 50%, transparent 100%)`,
                boxShadow: `0 0 10px rgba(147, 51, 234, 0.6)`,
              }}
              animate={{
                x: `${(50 - startX) * 1.2}vw`,
                y: `${(50 - startY) * 1.2}vh`,
                scale: [1, 1.5, 0],
                opacity: [0, 0.8, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            />
          );
        })}

        {/* Additional smaller qi particles for enhanced effect */}
        {Array.from({ length: 15 }).map((_, i) => {
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          
          return (
            <motion.div
              key={`qi-small-${i}`}
              className="absolute w-1 h-1 rounded-full bg-purple/60"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                filter: `blur(0.5px)`,
                boxShadow: `0 0 6px rgba(147, 51, 234, 0.5)`,
              }}
              animate={{
                x: `${(50 - startX) * 0.8}vw`,
                y: `${(50 - startY) * 0.8}vh`,
                scale: [0.5, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: Math.random() * 3,
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Clean Brand Logo as Title */}
        <motion.div
          className="mb-6 sm:mb-8 flex justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.img
            src="/brand-logo.png"
            alt="Shonen Ark"
            className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain"
            whileHover={{ 
              scale: 1.02
            }}
            transition={{ hover: { duration: 0.3 } }}
          />
        </motion.div>

        {/* Mystical tagline with enhanced styling */}
        <motion.div
          className="relative mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          <motion.p
            className="text-lg sm:text-xl text-white mb-8 font-mystical max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            "only time will tell"
          </motion.p>
        </motion.div>

        {/* CTA Button with Cinematic Glow */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <Link href="/register">
            <motion.button
              className="relative bg-forest-accent hover:bg-violet-glow text-parchment px-8 sm:px-12 py-3 sm:py-4 rounded-lg font-mystical text-base sm:text-lg tracking-wide border-2 border-line-highlight shrine-glow transition-all duration-300 w-full sm:w-auto"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(108, 92, 231, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Join the Ark</span>
              <motion.div
                className="absolute inset-0 bg-violet-glow rounded-lg opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShrineHero;
