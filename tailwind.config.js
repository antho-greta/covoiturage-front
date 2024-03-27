/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'bleuClair': '#B3DEE5',
        'bleuClairHover': '#6ccce0',
        'bleuFonce': '#31525B',
        'btnColor': '#4cb2c7',
        'orange' : '#FFA101',
        'beige': '#FAE6B1',
        'customBackground': '#37524e',
      }
    },
  },
  plugins: [],
}