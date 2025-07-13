module.exports = { 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ], 
  theme: { 
    extend: {
      colors: {
        'bg-dark': 'var(--bg-dark)',
        'bg-dark-secondary': 'var(--bg-dark-secondary)',
        'accent-pink': 'var(--accent-pink)',
        'accent-beige': 'var(--accent-beige)',
        'accent-rose': 'var(--accent-rose)',
        'text-light': 'var(--text-light)',
        'text-muted': 'var(--text-muted)',
        'text-accent': 'var(--text-accent)',
      },
      fontFamily: {
        'mystical': ['Cinzel', 'serif'],
        'brush': ['Crimson Text', 'serif'],
      },
      spacing: {
        'generous': '4rem',
        'generous-sm': '2rem',
      }
    } 
  }, 
  plugins: [] 
}; 
