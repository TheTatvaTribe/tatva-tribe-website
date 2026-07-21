/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hind', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        plan: '0 18px 36px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
