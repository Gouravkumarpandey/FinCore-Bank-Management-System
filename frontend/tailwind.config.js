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
        // Modern Blue & White theme (mapping original keys to new theme)
        brand: {
          black: '#FFFFFF',    // Now White
          dark: '#F8FAFC',     // Now Light Blue/Gray
          card: '#FFFFFF',     // Now White
          yellow: '#2563EB',   // Now Blue
          orange: '#3B82F6',   // Now Sky Blue
          gray: '#E2E8F0',     // Now Light Gray
          lightGray: '#64748B' // Now Darker Gray for text
        }
      }
    },
  },
  plugins: [],
}

