/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        playing: {
          '0%, 100%': { height: '0.5rem' },
          '50%': { height: '1.25rem' }
        }
      },
      animation: {
        'playing': 'playing 1s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}