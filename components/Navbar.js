import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header 
      className="p-4 border-b border-grey/30 flex justify-between items-center sticky top-0 bg-black/90 backdrop-blur-sm z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo Section */}
      <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
        {/* Brand Logo - Update path when you add your logo */}
        <div className="w-10 h-10 bg-purple rounded-lg flex items-center justify-center">
          <span className="text-white font-bold mystical-title">S</span>
        </div>
        <span className="text-2xl font-bold text-purple mystical-title hidden md:block">
          Shonen Ark
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8 text-sm">
        {[
          { href: "/theories", label: "Theories" },
          { href: "/discover", label: "Discover" },
          { href: "/calendar", label: "Calendar" },
          { href: "/library", label: "Library" }
        ].map((item) => (
          <motion.div key={item.href} whileHover={{ y: -2 }}>
            <Link 
              href={item.href}
              className="text-white hover:text-purple transition-colors nav-item"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex space-x-4">
        <Link href="/login">
          <motion.button 
            className="px-4 py-2 text-white hover:text-purple transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </Link>
        <Link href="/register">
          <motion.button 
            className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-dark-purple transition-colors shrine-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join
          </motion.button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <motion.div 
            className="w-full h-0.5 bg-white"
            animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
          />
          <motion.div 
            className="w-full h-0.5 bg-white"
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
          />
          <motion.div 
            className="w-full h-0.5 bg-white"
            animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
          />
        </div>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-grey/30 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 space-y-4">
              {[
                { href: "/theories", label: "Theories" },
                { href: "/discover", label: "Discover" },
                { href: "/calendar", label: "Calendar" },
                { href: "/library", label: "Library" }
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="block text-white hover:text-purple transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-grey/30 space-y-2">
                <Link href="/login" className="block text-white hover:text-purple transition-colors">
                  Login
                </Link>
                <Link href="/register" className="block">
                  <button className="w-full px-4 py-2 bg-purple text-white rounded-lg hover:bg-dark-purple transition-colors">
                    Join
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

