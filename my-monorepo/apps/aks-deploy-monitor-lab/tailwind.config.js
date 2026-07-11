/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 👈 This tells Tailwind to look in your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
