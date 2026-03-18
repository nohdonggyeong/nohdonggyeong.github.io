/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        bg: '#050810',
        surface: '#0d1117',
        'surface-2': '#161b27',
        accent: '#00f5d4',
        'accent-2': '#ff6b6b',
        'accent-3': '#a855f7',
        muted: '#4a5568',
        'text-primary': '#e2e8f0',
        'text-secondary': '#8892a4',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px #00f5d4, 0 0 20px #00f5d4' },
          '100%': { textShadow: '0 0 20px #00f5d4, 0 0 40px #00f5d4, 0 0 60px #00f5d4' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,245,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      boxShadow: {
        'glow-accent': '0 0 20px rgba(0,245,212,0.4), 0 0 40px rgba(0,245,212,0.1)',
        'glow-purple': '0 0 20px rgba(168,85,247,0.4), 0 0 40px rgba(168,85,247,0.1)',
        'glow-red': '0 0 20px rgba(255,107,107,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}

