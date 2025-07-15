import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ThemeAwareLogo from './ThemeAwareLogo';
import ThemeToggle from './ThemeToggle';

const VerticalNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Theories', path: '/theories', icon: '📜' },
    { name: 'Animations', path: '/animations', icon: '🎬' },
    { name: 'Calendar', path: '/calendar', icon: '📅' },
    { name: 'Account', path: '/account', icon: '👤' },
    { name: 'Fan Creations', path: '/fan-feed', icon: '🎨' },
    { name: 'Sound', path: '/gigs', icon: '' },
    { name: 'Character Design', path: '/arcs', icon: '🎭' },
    { name: 'Shrine', path: '/about', icon: '⛩️' }
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
        className="fixed top-4 left-20 z-50 md:hidden w-12 h-12 bg-black border border-grey rounded-lg flex items-center justify-center text-white"
        onClick={() => setIsExpanded(!isExpanded)}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 90 : 0 }}
      >
        ☰
      </motion.button>

      {/* Navigation Container */}
      <motion.nav
        className={`fixed top-0 left-0 h-full bg-black backdrop-blur-lg border-r border-grey/30 z-40 transition-all duration-300 ease-in-out group ${
          isExpanded ? 'w-64' : 'w-16 md:w-20 hover:w-64'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="p-6 border-b border-grey/30">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-dark-purple rounded-lg flex items-center justify-center text-white font-mystical">
              S
            </div>
            <span className="text-white font-mystical text-lg opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
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
                        ? 'bg-[var(--accent)] border-l-4 border-[var(--accent)] text-[var(--bg)]' 
                        : 'hover:bg-[var(--hover-bg)] text-[var(--text-secondary)] hover:text-[var(--text)]'
                    }`}
                  >
                    {/* Icon */}
                    <motion.span
                      className="text-xl flex-shrink-0 justify-center group-hover:mr-4"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.span>
                    
                    {/* Label */}
                    <span className="font-brush text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap ml-3">
                      {item.name}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 bg-[var(--accent)] rounded-lg opacity-0 pointer-events-none"
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
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--border)]/30">
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-[var(--text-secondary)] text-xs font-mono opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              v1.0.0
            </div>
          </motion.div>
        </div>

        {/* Accent Line */}
        <div className="absolute left-0 top-1/4 w-1 h-1/2 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-30" />
      </motion.nav>

      {/* Mobile Overlay */}
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-[var(--bg)]/50 backdrop-blur-sm z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default VerticalNav;
