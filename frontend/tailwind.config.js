/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: '#FBFBFB',
          card: '#FFFFFF',
          border: '#EAEAEA',
          borderDark: '#D4D4D8',
          text: '#111111',
          muted: '#71717A',
          subtle: '#F4F4F5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
