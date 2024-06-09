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
        cover: { second: "#f5f5f5" },
        card: {
          bg: "#eaebf0",
        },
      },
    },
  },
  plugins: [],
};
