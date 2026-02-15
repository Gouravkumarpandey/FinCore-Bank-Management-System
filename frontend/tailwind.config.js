/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'], // Added custom font as per user request (User: "Modern typography")
      },
      colors: {
        // FamApp inspired theme
        brand: {
          black: '#000000',
          dark: '#121212',
          card: '#1E1E1E',
          yellow: '#FCCF08', // The iconic yellow
          orange: '#FF8A00',
          gray: '#2D2D2D',
          lightGray: '#888888'
        }
      }
    },
  },
  plugins: [],
}

