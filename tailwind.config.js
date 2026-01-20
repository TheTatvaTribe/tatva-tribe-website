/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors from The Tatva Tribe
        forest: {
          50: '#f0f4f1',
          100: '#d1ddd4',
          200: '#a3bba9',
          300: '#75997e',
          400: '#477753',
          500: '#2d5a3a',
          600: '#1B3022', // Primary Forest Green
          700: '#152619',
          800: '#0f1c10',
          900: '#092610',
        },
        gold: {
          50: '#fdf9e6',
          100: '#f9efc0',
          200: '#f3df8a',
          300: '#e9ca54',
          400: '#D4AF37', // Primary Gold
          500: '#C5A021',
          600: '#a68419',
          700: '#866812',
          800: '#664c0c',
          900: '#463006',
        },
        cream: '#F5F5F5',
        dark: '#0A0A0A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
