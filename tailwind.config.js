/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // You can extend the default Tailwind theme here
      colors: {
        'primary': '#3B82F6',  // Custom color example
      },
      // Add custom spacing, breakpoints, etc.
    },
  },
  plugins: [],
}