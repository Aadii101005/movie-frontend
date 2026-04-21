/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0b0f',
        foreground: '#f5f5f5',
        primary: '#e50914',
        'primary-hover': '#ff1f1f',
        secondary: '#141414',
        card: 'rgba(20, 20, 20, 0.75)',
        accent: '#22d3ee',
        glass: 'rgba(255, 255, 255, 0.04)',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        muted: '#9ca3af',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      borderRadius: {
        'md': '12px',
      },
      boxShadow: {
        'custom': '0 10px 30px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
