import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ThemeAwareLogo = ({ 
  size = 'medium', 
  variant = 'full', 
  showText = true, 
  className = '',
  ...props 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Simple fallback for SSR
  if (!mounted) {
    return (
      <div className={`${sizeClasses[size]} bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--bg)] font-mystical ${className}`}>
        S
      </div>
    );
  }

  return (
    <motion.div
      className={`flex items-center space-x-2 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className={`${sizeClasses[size]} bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--bg)] font-mystical`}>
        S
      </div>
      {showText && variant === 'full' && (
        <span className="font-mystical text-[var(--text)] font-bold">
          Shonen Ark
        </span>
      )}
    </motion.div>
  );
};

export default ThemeAwareLogo;
