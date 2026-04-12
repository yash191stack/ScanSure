/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A3E635",   // Intense Lime
        secondary: "#FB923C", // Bright Orange
        accent: "#C084FC",    // Vivid Purple
      }
    },
  },
  plugins: [],
}

