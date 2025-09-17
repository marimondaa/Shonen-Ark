import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../lib/hooks/auth-context';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);
  // Theme toggle removed; default to light-first
  const { isAuthenticated, user, logout } = useAuth();

  // Remove dark-mode initialization; keep light-first

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.hamburger-menu')) {
        setIsMenuOpen(false);
      }
      if (isFloatingMenuOpen && !event.target.closest('.floating-menu-container')) {
        setIsFloatingMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen, isFloatingMenuOpen]);

  const toggleMenu = () => {
    console.log('Menu toggle clicked!', !isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const floatingMenuItems = [
    { href: "/theories", label: "Theories", icon: "🔮", desc: "Fan theories & analysis" },
    { href: "/discovery", label: "Discovery", icon: "🎨", desc: "Creator content" },
    { href: "/calendar", label: "Calendar", icon: "📅", desc: "Release schedule" },
    { href: "/gigs", label: "Gigs", icon: "⚡", desc: "Community work" },
    { href: "/about", label: "About", icon: "❓", desc: "Our mission" },
    { href: "/contact", label: "Contact", icon: "📧", desc: "Get in touch" }
  ];

  return (
    <div className="min-h-screen font-japanese transition-colors duration-200 bg-white text-black dark:bg-background dark:text-text-light">
      {/* Navigation */}
      <nav className="nav-backdrop sticky top-0 z-50 shadow-2xl" style={{ zIndex: 999 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo with Floating Menu */}
            <div className="flex items-center floating-menu-container relative">
              <motion.div
                onMouseEnter={() => setIsFloatingMenuOpen(true)}
                onMouseLeave={() => setIsFloatingMenuOpen(false)}
                className="relative"
              >
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
                      width={40} 
                      height={40}
                      className="shrine-glow"
                    />
                  </motion.div>
                  <span className="ml-3 text-xl font-bold mystical-title text-accent-pink group-hover:text-white transition-colors duration-300">
                    Shonen Ark
                  </span>
                </Link>

                {/* Floating Menu */}
                <AnimatePresence>
                  {isFloatingMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-sm rounded-xl shadow-2xl border border-accent-pink/20 overflow-hidden"
                      style={{ zIndex: 10000 }}
                      onMouseEnter={() => setIsFloatingMenuOpen(true)}
                      onMouseLeave={() => setIsFloatingMenuOpen(false)}
                    >
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-accent-pink mb-3 px-2">Quick Navigation</h3>
                        <div className="space-y-1">
                          {floatingMenuItems.map((item, index) => (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Link 
                                href={item.href}
                                onClick={() => setIsFloatingMenuOpen(false)}
                                className="group flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-purple/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink"
                              >
                                <motion.span 
                                  className="text-lg opacity-70 group-hover:opacity-100 transition-opacity"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                >
                                  {item.icon}
                                </motion.span>
                                <div className="flex-1">
                                  <div className="font-medium text-white group-hover:text-accent-pink transition-colors">
                                    {item.label}
                                  </div>
                                  <div className="text-xs text-text-muted group-hover:text-accent-pink/70 transition-colors">
                                    {item.desc}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="border-t border-accent-pink/20 mt-4 pt-4">
                          <div className="grid grid-cols-2 gap-2">
                            <Link 
                              href="/register"
                              onClick={() => setIsFloatingMenuOpen(false)}
                              className="bg-gradient-to-r from-purple to-accent-pink hover:from-purple/80 hover:to-accent-pink/80 text-white text-center py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 shrine-glow"
                            >
                              Join Now
                            </Link>
                            <Link 
                              href="/login"
                              onClick={() => setIsFloatingMenuOpen(false)}
                              className="border border-purple text-purple hover:bg-purple/10 text-center py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300"
                            >
                              Sign In
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Hamburger Menu */}
              <div className="relative hamburger-menu" style={{ zIndex: 9999 }}>
                <motion.button
                  onClick={toggleMenu}
                  onTouchStart={toggleMenu} // Add touch support for mobile
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-4 rounded-lg bg-purple/80 hover:bg-purple text-paper-beige hover:text-paper-beige focus:outline-none focus:ring-4 focus:ring-purple border-2 border-purple shrine-glow transition-all duration-300 cursor-pointer touch-manipulation shadow-lg"
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMenuOpen}
                  style={{ 
                    zIndex: 9999, 
                    minWidth: '56px', 
                    minHeight: '56px',
                    position: 'relative',
                    isolation: 'isolate'
                  }}
                >
                  <motion.div className="w-6 h-6 flex flex-col justify-around">
                    <motion.span
                      className="w-full h-0.5 bg-current rounded-full"
                      animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="w-full h-0.5 bg-current rounded-full"
                      animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="w-full h-0.5 bg-current rounded-full"
                      animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-ink-black/95 backdrop-blur-sm rounded-xl shadow-2xl border-2 border-purple/30 overflow-hidden"
                      style={{ zIndex: 10000 }}
                    >
                      <div className="p-4">
                        {/* Navigation Links Section */}
                        <div className="space-y-1 mb-4">
                          <h3 className="text-sm font-semibold font-manga-header text-purple mb-3 px-2 uppercase tracking-widest">Navigation</h3>
                          {[
                            { href: "/", label: "Home", icon: "🏯", desc: "Welcome to Shonen Ark" },
                            { href: "/theories", label: "Theories", icon: "📜", desc: "Explore fan theories" },
                            { href: "/discovery", label: "Discovery", icon: "🔍", desc: "Find new content" },
                            { href: "/calendar", label: "Calendar", icon: "📅", desc: "Anime schedule" },
                            { href: "/gigs", label: "Gigs", icon: "⚡", desc: "Job opportunities" },
                            { href: "/about", label: "About", icon: "❓", desc: "Learn more about us" }
                          ].map((item) => (
                            <motion.div
                              key={item.href}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Link 
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="group flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-purple/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple border border-transparent hover:border-purple/30"
                              >
                                <motion.span 
                                  className="text-lg opacity-70 group-hover:opacity-100 transition-opacity"
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                >
                                  {item.icon}
                                </motion.span>
                                <div className="flex-1">
                                  <div className="font-medium font-manga-header text-paper-beige group-hover:text-purple transition-colors">
                                    {item.label}
                                  </div>
                                  <div className="text-xs font-manga-body text-text-muted group-hover:text-purple/70 transition-colors">
                                    {item.desc}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {/* Authentication Section */}
                        <div className="border-t border-purple/30 pt-4">
                          {isAuthenticated() ? (
                            <>
                              <h3 className="text-sm font-semibold text-accent-pink mb-3 px-2">Account</h3>
                              
                              {/* Dashboard Link */}
                              <motion.div
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Link 
                                  href="/account/fan"
                                  onClick={() => setIsMenuOpen(false)}
                                  className="group flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple/20 hover:to-accent-pink/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink shrine-glow mb-3"
                                >
                                  <span className="text-lg">👑</span>
                                  <div className="flex-1">
                                    <div className="font-medium text-white group-hover:text-accent-pink transition-colors">
                                      Dashboard
                                    </div>
                                    <div className="text-xs text-text-muted group-hover:text-accent-pink/70 transition-colors">
                                      Your admin panel
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                              
                              {/* User Info & Logout */}
                              <div className="auth-badge px-3 py-3 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <div>
                                    <div className="text-sm font-medium text-accent-pink">
                                      {user?.username}
                                    </div>
                                    <div className="text-xs text-text-muted">
                                      {user?.role === 'admin' ? 'Administrator' : 'User'}
                                    </div>
                                  </div>
                                  <span className="text-lg">{user?.role === 'admin' ? '👑' : '🌟'}</span>
                                </div>
                                <motion.button 
                                  onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                  }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  className="w-full text-sm px-3 py-2 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all duration-300 border border-red-500/30 hover:border-red-400/50"
                                >
                                  Logout
                                </motion.button>
                              </div>
                            </>
                          ) : (
                            <>
                              <h3 className="text-sm font-semibold text-accent-pink mb-3 px-2">Authentication</h3>
                              <div className="space-y-2">
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Link 
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center space-x-3 px-3 py-3 rounded-lg hover:bg-purple/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink"
                                  >
                                    <span className="text-lg">🔐</span>
                                    <div className="flex-1">
                                      <div className="font-medium text-white group-hover:text-accent-pink transition-colors">
                                        Login
                                      </div>
                                      <div className="text-xs text-text-muted group-hover:text-accent-pink/70 transition-colors">
                                        Access your account
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                                
                                <motion.div
                                  whileHover={{ x: 5 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Link 
                                    href="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="group flex items-center justify-center px-3 py-3 rounded-lg bg-gradient-to-r from-purple to-accent-pink hover:from-purple/80 hover:to-accent-pink/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-pink shrine-glow"
                                  >
                                    <span className="font-medium text-white">
                                      Create Account
                                    </span>
                                  </Link>
                                </motion.div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative mt-16">
        <div className="footer-glass border-t border-accent-pink/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Link href="/" className="flex items-center hover:opacity-80 transition-opacity group">
                  <Image 
                    src="/images/logo/shonen-ark/symbol-192x192.png" 
                    alt="Shonen Ark Logo" 
                    width={32} 
                    height={32}
                    className="shrine-glow"
                  />
                  <span className="ml-2 text-lg font-bold mystical-title text-accent-pink group-hover:text-white transition-colors">
                    Shonen Ark
                  </span>
                </Link>
                <p className="text-text-muted text-sm leading-relaxed">
                  Your mystical gateway to anime theories, discoveries, and community insights.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-accent-pink mb-4">Explore</h4>
                <ul className="space-y-3">
                  {[
                    { href: "/theories", label: "Theories" },
                    { href: "/discovery", label: "Discovery" },
                    { href: "/calendar", label: "Calendar" },
                    { href: "/gigs", label: "Gigs" }
                  ].map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className="text-text-muted hover:text-accent-pink transition-colors text-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-accent-pink mb-4">Community</h4>
                <ul className="space-y-3">
                  {[
                    { href: "/about", label: "About Us" },
                    { href: "/contact", label: "Contact" },
                    { href: "/terms", label: "Terms" },
                    { href: "/register", label: "Join Us" }
                  ].map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        className="text-text-muted hover:text-accent-pink transition-colors text-sm"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-accent-pink mb-4">Connect</h4>
                <p className="text-text-muted text-sm mb-4">
                  Stay updated with the latest anime insights and theories.
                </p>
                <div className="flex space-x-3">
                  {['📧', '🐦', '📘', '📷'].map((icon, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-lg bg-purple/20 hover:bg-purple/40 flex items-center justify-center text-accent-pink hover:text-white transition-all duration-300 shrine-glow"
                    >
                      {icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-accent-pink/20 mt-8 pt-8 text-center">
              <p className="text-text-muted text-sm">
                © 2024 Shonen Ark. Crafted with ❤️ for the anime community.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;