/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        "green-ceibo": "#6fbdad",
        "red-ceibo": "#af2837",
        "purple-ceibo": "#975497",
        "light-blue-ceibo": "#51d0fb"
      }
    },
    fontFamily: {
      abc: ["Sunflower", "sans-serif"],
    }
  },
  plugins: [],
}
