/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Yeh line check kar, ismein galti hoti hai
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}