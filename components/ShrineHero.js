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
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Brush-styled Title */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-mystical text-parchment mb-6 sm:mb-8 tracking-wide ink-brush-edge leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Shonen Ark
        </motion.h1>

        {/* Mystical tagline with enhanced styling */}
        <motion.div
          className="relative mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-transparent bg-gradient-to-r from-purple via-white to-purple bg-clip-text font-mystical leading-relaxed px-2 sm:px-0 text-center max-w-4xl mx-auto"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            <span className="relative inline-block">
              Where ink meets legend
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.8 }}
              />
            </span>
            <br className="hidden sm:inline" />
            <span className="sm:hidden"> </span>
            <span className="relative inline-block text-grey glow-text">
              and theories become truth
            </span>
          </motion.p>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-purple/30 text-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            ✦
          </motion.div>
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-purple/30 text-sm"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            ✦
          </motion.div>
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-stone-wash rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-line-highlight rounded-full mt-2"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShrineHero;
