/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Solo Leveling Inspired - Dark & Electric
        'void-black': '#0a0a0f',        // Darkest background
        'shadow-dark': '#12121a',        // Primary background
        'abyss': '#1a1a2e',              // Secondary background
        'midnight-purple': '#1f1535',    // Dark purple bg
        'electric-purple': '#8b5cf6',    // Primary accent (vibrant)
        'neon-violet': '#a78bfa',        // Secondary accent
        'plasma-purple': '#c084fc',      // Highlight
        'steel-blue': '#64748b',         // Muted accent
        'steel-gray': '#94a3b8',         // Text secondary
        'ash-white': '#e2e8f0',          // Text primary
        'pure-white': '#ffffff',         // Pure white

        // Status colors (masculine)
        'blood-red': '#dc2626',
        'warning-amber': '#f59e0b',
        'success-emerald': '#10b981',

        // Legacy compatibility (map to new colors)
        'background': '#12121a',
        'text-light': '#e2e8f0',
        'text-muted': '#94a3b8',
        'text-accent': '#8b5cf6',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'Impact', 'sans-serif'],        // Bold headers
        'heading': ['Inter', 'sans-serif'],                        // Subheadings  
        'body': ['Inter', 'sans-serif'],                           // Body text
        'mono': ['IBM Plex Mono', 'Courier New', 'monospace'],    // Code/stats
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'electric': 'electric 1.5s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)',
          },
        },
        slideUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        electric: {
          '0%, 100%': {
            filter: 'brightness(1)',
          },
          '50%': {
            filter: 'brightness(1.2)',
          },
        },
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
        'gradient-purple': 'linear-gradient(135deg, #1f1535 0%, #8b5cf6 100%)',
        'gradient-electric': 'linear-gradient(90deg, #8b5cf6, #a78bfa, #c084fc)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.6)',
        'dark': '0 10px 30px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
