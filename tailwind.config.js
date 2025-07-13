module.exports = { 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ], 
  theme: { 
    extend: {
      colors: {
        // Existing mystical colors
        'bg-dark': 'var(--bg-dark)',
        'bg-dark-secondary': 'var(--bg-dark-secondary)',
        'accent-pink': 'var(--accent-pink)',
        'accent-beige': 'var(--accent-beige)',
        'accent-rose': 'var(--accent-rose)',
        'text-light': 'var(--text-light)',
        'text-muted': 'var(--text-muted)',
        'text-accent': 'var(--text-accent)',
        
        // New fusion theme tokens
        'ink-black': '#0a0a0a',
        'sumi-gray': '#2b2b2b',
        'stone-wash': '#6e6e6e',
        'parchment': '#f2e9db',
        'forest-accent': '#1f4f3d',
        'violet-glow': '#6c5ce7',
        'line-highlight': '#ddddcc'
      },
      fontFamily: {
        'mystical': ['Cinzel', 'serif'],
        'brush': ['Crimson Text', 'serif'],
        'mono': ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      spacing: {
        'generous': '4rem',
        'generous-sm': '2rem',
      },
      backgroundImage: {
        'ink-texture': "url('/assets/textures/ink-wash.png')",
        'torii-silhouette': "url('/assets/torii/gate-silhouette.svg')",
      }
    } 
  }, 
  plugins: [] 
}; 
