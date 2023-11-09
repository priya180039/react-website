/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-low": "url('/src/assets/mainLow.jpg')",
        landing: "url('/src/assets/landingBg.jpg')",
      },
    },
  },
  plugins: [],
};
