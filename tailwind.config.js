/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "soft-glow": "0 30px 90px rgba(177,134,106,0.14)"
      }
    }
  },
  plugins: [],
};