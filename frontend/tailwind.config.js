/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf4f5',
          100: '#fbe8eb',
          200: '#f7d5db',
          300: '#f1b3bf',
          400: '#e7879b',
          500: '#d95374',
          600: '#c4375b',
          700: '#a42848',
          800: '#89243e',
          900: '#752238',
          950: '#420d1c',
        },
        fashion: {
          dark: '#0c0d12',
          card: '#161821',
          border: '#262938',
          accent: '#9333ea',
          gold: '#eab308'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}

