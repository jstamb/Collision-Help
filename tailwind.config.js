/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5fa',
          100: '#dde8f3',
          200: '#c1d6ea',
          300: '#96bdde',
          400: '#649ece',
          500: '#4182b7',
          600: '#306898', // Primary Action
          700: '#27537b',
          800: '#234666',
          900: '#213b54',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}