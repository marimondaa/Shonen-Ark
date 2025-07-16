import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/auth-context';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

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
      <nav className="nav-backdrop sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-18">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center hover:opacity-80 transition-all duration-300 group"
                aria-label="Shonen Ark Home"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="nav-logo-glow"
                >
                  <Image 
                    src="/images/logo/shonen-ark/symbol-192x192.png" 
                    alt="Shonen Ark Logo" 
                    width={45} 
                    height={45}
                    className="shrine-glow"
                  />
                </motion.div>
                <span className="ml-3 text-xl font-bold mystical-title text-accent-pink hidden sm:block group-hover:text-white transition-colors duration-300">
                  Shonen Ark
                </span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-1" role="navigation">
              {[
                { href: "/", label: "Home", icon: "🏯" },
                { href: "/theories", label: "Theories", icon: "📜" },
                { href: "/discovery", label: "Discovery", icon: "🔍" },
                { href: "/calendar", label: "Calendar", icon: "📅" },
                { href: "/gigs", label: "Gigs", icon: "⚡" }
              ].map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="nav-float"
                >
                  <Link 
                    href={item.href} 
                    className="nav-item-enhanced group relative px-4 py-3 mx-1 rounded-lg transition-all duration-300 hover:bg-purple/20 focus:outline-none focus:ring-2 focus:ring-accent-pink"
                  >
                    <div className="flex items-center space-x-2">
                      <motion.span 
                        className="text-sm opacity-70 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="nav-item group-hover:text-accent-pink transition-colors font-medium">
                        {item.label}
                      </span>
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-pink to-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId="navbar-indicator"
                    />
                  </Link>
                </motion.div>
              ))}
              
              {/* Authentication Section */}
              <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-accent-pink/20">
                {isAuthenticated() ? (
                  <>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href="/account/fan" 
                        className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple/20 hover:to-accent-pink/20 focus:outline-none focus:ring-2 focus:ring-accent-pink shrine-glow"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">👑</span>
                          <span className="nav-item group-hover:text-accent-pink transition-colors font-medium">
                            Dashboard
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                    
                    <div className="auth-badge flex items-center space-x-3 rounded-lg px-4 py-2">
                      <motion.span 
                        className="text-sm text-accent-pink font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Welcome, {user?.username}
                      </motion.span>
                      <motion.button 
                        onClick={logout}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs px-3 py-1 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all duration-300 border border-red-500/30 hover:border-red-400/50"
                      >
                        Logout
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href="/login" 
                        className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-purple/20 focus:outline-none focus:ring-2 focus:ring-accent-pink"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">🔐</span>
                          <span className="nav-item group-hover:text-accent-pink transition-colors font-medium">
                            Login
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href="/register" 
                        className="group relative px-4 py-2 rounded-lg bg-gradient-to-r from-purple to-accent-pink hover:from-purple/80 hover:to-accent-pink/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink shrine-glow"
                      >
                        <span className="text-white font-medium text-sm">
                          Register
                        </span>
                      </Link>
                    </motion.div>
                  </>
                )}
                
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/about" 
                    className="group relative px-4 py-3 rounded-lg transition-all duration-300 hover:bg-purple/20 focus:outline-none focus:ring-2 focus:ring-accent-pink"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                        ❓
                      </span>
                      <span className="nav-item group-hover:text-accent-pink transition-colors font-medium">
                        About
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 rounded-lg bg-purple/20 text-text-light hover:text-accent-pink focus:outline-none focus:ring-2 focus:ring-accent-pink border border-purple/30 shrine-glow"
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
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden border-t border-accent-pink/20"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <nav className="mobile-menu-glass px-4 pt-4 pb-6 space-y-2 backdrop-blur-md" role="navigation">
                {[
                  { href: "/", label: "Home", icon: "🏯" },
                  { href: "/theories", label: "Theories", icon: "📜" },
                  { href: "/discovery", label: "Discovery", icon: "🔍" },
                  { href: "/calendar", label: "Calendar", icon: "📅" },
                  { href: "/gigs", label: "Gigs", icon: "⚡" }
                ].map((item) => (
                  <motion.div
                    key={item.href}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.href} 
                      className="group flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-purple/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink"
                    >
                      <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.icon}
                      </span>
                      <span className="nav-item group-hover:text-accent-pink transition-colors font-medium">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="border-t border-accent-pink/20 pt-4 mt-4">
                  {isAuthenticated() ? (
                    <>
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          href="/account/fan" 
                          className="group flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple/20 hover:to-accent-pink/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink shrine-glow"
                        >
                          <span className="text-lg">👑</span>
                          <span className="nav-item group-hover:text-accent-pink transition-colors font-medium">
                            Dashboard
                          </span>
                        </Link>
                      </motion.div>
                      
                      <div className="auth-badge mt-3 px-4 py-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <motion.span 
                            className="text-sm text-accent-pink font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            Welcome, {user?.username}
                          </motion.span>
                          <motion.button 
                            onClick={logout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-xs px-3 py-1 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all duration-300 border border-red-500/30 hover:border-red-400/50"
                          >
                            Logout
                          </motion.button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          href="/login" 
                          className="group flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-purple/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink"
                        >
                          <span className="text-lg">🔐</span>
                          <span className="nav-item group-hover:text-accent-pink transition-colors font-medium">
                            Login
                          </span>
                        </Link>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          href="/register" 
                          className="flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-purple to-accent-pink hover:from-purple/80 hover:to-accent-pink/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink shrine-glow"
                        >
                          <span className="text-white font-medium">
                            Register
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  )}
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href="/about" 
                      className="group flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-purple/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink mt-2"
                    >
                      <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                        ❓
                      </span>
                      <span className="nav-item group-hover:text-accent-pink transition-colors font-medium">
                        About
                      </span>
                    </Link>
                  </motion.div>
                </div>
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
                <li><Link href="/discovery" className="text-text-muted hover:text-accent-pink transition-colors">Discovery</Link></li>
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
