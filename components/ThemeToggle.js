import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Don't render until mounted to avoid SSR issues
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center">
        <span className="text-sm">🌓</span>
      </div>
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-lg"
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;
