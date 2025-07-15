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
        // Simplified Color Palette
        'black': '#000000',
        'grey': '#808080',
        'dark-purple': '#2d1b69',
        'purple': '#6c5ce7',
        'white': '#ffffff',
        'glow-purple': 'rgba(108, 92, 231, 0.3)',
        
        // Theme Application
        'bg-dark': '#000000',
        'bg-dark-secondary': '#1a1a1a',
        'text-light': '#ffffff',
        'text-muted': '#808080',
        'text-accent': '#6c5ce7',
      },
      fontFamily: {
        'mystical': ['Cinzel', 'serif'],
        'brush': ['Crimson Text', 'serif'],
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
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
      },
      backgroundImage: {
        'gradient-mystical': 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        'gradient-shrine': 'linear-gradient(135deg, #0e0e0e 0%, #1a1a1a 50%, #db929d 100%)',
      },
    },
  },
  plugins: [],
}
