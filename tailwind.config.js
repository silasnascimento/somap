/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#1D9E75',
          dark: '#147A5A'
        }
      }
    },
  },
  plugins: [],
}
