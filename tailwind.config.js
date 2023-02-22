/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [],
};
