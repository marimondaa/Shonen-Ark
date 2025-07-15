import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mystical text-text-light">
      {/* Navigation */}
      <nav className="bg-anime-blue/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-2xl font-bold mystical-title text-accent-pink hover:text-accent-rose transition-colors shrine-glow"
                aria-label="Shonen Ark Home"
              >
                Shonen Ark
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8" role="navigation">
              <Link href="/" className="nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded px-3 py-2">
                Home
              </Link>
              <Link href="/theories" className="nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded px-3 py-2">
                Theories
              </Link>
              <Link href="/discover" className="nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded px-3 py-2">
                Discover
              </Link>
              <Link href="/calendar" className="nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded px-3 py-2">
                Calendar
              </Link>
              <Link href="/account" className="nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded px-3 py-2">
                Account
              </Link>
              <Link href="/about" className="nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded px-3 py-2">
                About
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-text-light hover:text-accent-pink focus:outline-none focus:ring-2 focus:ring-accent-pink rounded p-2"
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                <motion.svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-anime-blue/95" role="navigation">
                <Link href="/" className="block px-3 py-2 nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded">
                  Home
                </Link>
                <Link href="/theories" className="block px-3 py-2 nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded">
                  Theories
                </Link>
                <Link href="/discover" className="block px-3 py-2 nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded">
                  Discover
                </Link>
                <Link href="/calendar" className="block px-3 py-2 nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded">
                  Calendar
                </Link>
                <Link href="/account" className="block px-3 py-2 nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded">
                  Account
                </Link>
                <Link href="/about" className="block px-3 py-2 nav-item hover:text-accent-pink transition-colors focus:outline-none focus:ring-2 focus:ring-accent-pink rounded">
                  About
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1" role="main">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-anime-blue/90 backdrop-blur-sm mt-auto border-t border-accent-pink/20" role="contentinfo">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mystical-title text-accent-pink mb-4">Shonen Ark</h3>
              <p className="text-text-muted">
                A mystical platform for anime theories, fan creations, and community discussions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/theories" className="text-text-muted hover:text-accent-pink transition-colors">Theories</Link></li>
                <li><Link href="/discover" className="text-text-muted hover:text-accent-pink transition-colors">Discover</Link></li>
                <li><Link href="/calendar" className="text-text-muted hover:text-accent-pink transition-colors">Calendar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-text-muted hover:text-accent-pink transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="text-text-muted hover:text-accent-pink transition-colors">Terms</Link></li>
                <li><Link href="/about" className="text-text-muted hover:text-accent-pink transition-colors">About</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-accent-pink/20 mt-8 pt-8 text-center">
            <p className="text-text-muted">
              © 2024 Shonen Ark. A mystical fan theory and media hub.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
