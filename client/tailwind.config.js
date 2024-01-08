/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", //add in tailwind.config.js file
  ],
  theme: {
    extend: {
      colors: {
        light: "#ffffff",
        mbg: { active: "#878ef8" },
        chat: { bg: "#edeefc" },
        card: {
          bg: "#eaebf0",
        },
      },
    },
  },
  plugins: [],
};
