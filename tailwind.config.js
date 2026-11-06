/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bgMain: '#0C1017',
        bgStrip: '#121822',
        bgCard: '#141B26',
        coral: '#FF6B4A',
        coralSoft: '#FF856A',
      },
    },
  },
  plugins: [],
};
