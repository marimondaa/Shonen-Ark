/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Original Shonen Ark Colors (preserved)
        'black': '#000000',
        'grey': '#808080',
        'dark-purple': '#2d1b69',
        'purple': '#6c5ce7',
        'white': '#ffffff',
        'glow-purple': 'rgba(108, 92, 231, 0.3)',
        
        // Manga Club Aesthetic Colors
        'ink-black': '#1A1A1A',
        'paper-beige': '#D9D6C3',
        'blood-red': '#6c5ce7', // Changed back to purple
        'manga-white': '#ffffff',
        'panel-border': '#000000',
        
        // Theme Application (enhanced)
        'bg-dark': '#1A1A1A', // Updated to ink-black
        'bg-dark-secondary': '#1a1a1a',
        'bg-canvas': '#D9D6C3', // Paper beige for manga panels
        'text-light': '#ffffff',
        'text-muted': '#808080',
        'text-accent': '#6c5ce7', // Back to purple
        'accent-pink': '#6c5ce7', // Back to purple
        'background': '#1A1A1A', // Map to ink-black
      },
      fontFamily: {
        // Original Shonen Ark fonts (preserved)
        'mystical': ['Cinzel', 'serif'],
        'brush': ['Crimson Text', 'serif'],
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'japanese': ['Inter', 'sans-serif'],
        
        // Manga Club fonts
        'manga-header': ['Bebas Neue', 'Anton', 'Impact', 'sans-serif'],
        'manga-body': ['IBM Plex Mono', 'Rubik', 'Inter', 'monospace'],
        'panel-text': ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'manga-zoom': 'mangaZoom 0.3s ease-out',
        'panel-slide': 'panelSlide 0.5s ease-in-out',
        'speed-lines': 'speedLines 0.8s linear infinite',
        'bubble-pop': 'bubblePop 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        glow: {
          from: {
            'text-shadow': '0 0 20px #6c5ce7, 0 0 30px #6c5ce7, 0 0 40px #6c5ce7',
          },
          to: {
            'text-shadow': '0 0 10px #6c5ce7, 0 0 20px #6c5ce7, 0 0 30px #6c5ce7',
          },
        },
        mangaZoom: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        panelSlide: {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        speedLines: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100px 100px' },
        },
        bubblePop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-mystical': 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        'gradient-shrine': 'linear-gradient(135deg, #0e0e0e 0%, #1a1a1a 50%, #db929d 100%)',
      },
    },
  },
  plugins: [],
}
