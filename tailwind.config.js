/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'right-lg': '5px 0 15px -5px rgba(0, 0, 0, 0.1)', /* Custom right-side shadow */
      },
    },
  },
  plugins: [],
}

