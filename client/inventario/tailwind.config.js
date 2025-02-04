/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgb(33, 53, 85)',
        bluelith: 'rgb(62, 88, 121)',
        beige: 'rgb(216, 196, 182)',
        beigeclaro: 'rgb(245, 239, 231)'
      },
    },
  },
  plugins: [],
};
