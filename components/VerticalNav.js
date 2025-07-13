import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const VerticalNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Creators', path: '/creators', icon: '✨' },
    { name: 'Fan Feed', path: '/theories', icon: '📜' },
    { name: 'Theory Vault', path: '/animations', icon: '🔮' },
    { name: 'Calendar', path: '/calendar', icon: '📅' },
    { name: 'Payments', path: '/account', icon: '💫' },
    { name: 'About', path: '/about', icon: '⛩️' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 md:hidden w-12 h-12 bg-sumi-gray border border-line-highlight rounded-lg flex items-center justify-center text-parchment"
        onClick={() => setIsExpanded(!isExpanded)}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 90 : 0 }}
      >
        ☰
      </motion.button>

      {/* Navigation Container */}
      <motion.nav
        className={`fixed top-0 right-0 h-full w-64 bg-ink-black/95 backdrop-blur-lg border-l border-line-highlight/30 z-40 transform transition-transform duration-300 ${
          isExpanded ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 md:w-20 hover:md:w-64 group`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="p-6 border-b border-line-highlight/30">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-forest-accent rounded-lg flex items-center justify-center text-parchment font-mystical">
              S
            </div>
            <span className="text-parchment font-mystical text-lg opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              Shonen Ark
            </span>
          </motion.div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = router.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={item.path}>
                  <div
                    className={`flex items-center p-3 rounded-lg transition-all duration-300 cursor-pointer group/item ${
                      isActive 
                        ? 'bg-forest-accent border-l-4 border-violet-glow text-parchment' 
                        : 'hover:bg-sumi-gray text-stone-wash hover:text-parchment'
                    }`}
                  >
                    {/* Icon */}
                    <motion.span
                      className="text-xl mr-4 flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.span>
                    
                    {/* Label */}
                    <span className="font-brush text-sm md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {item.name}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-violet-glow rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 bg-violet-glow rounded-lg opacity-0 pointer-events-none"
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-line-highlight/30">
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-stone-wash text-xs font-mono opacity-60 md:opacity-0 md:group-hover:opacity-60 transition-opacity duration-300">
              v1.0.0
            </div>
          </motion.div>
        </div>

        {/* Ink Brush Effect */}
        <div className="absolute left-0 top-1/4 w-1 h-1/2 bg-gradient-to-b from-transparent via-forest-accent to-transparent opacity-30" />
      </motion.nav>

      {/* Mobile Overlay */}
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-ink-black/50 backdrop-blur-sm z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default VerticalNav;
