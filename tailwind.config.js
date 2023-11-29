/** @type {import('tailwindcss').Config} */
export default {
  content: ['./App.vue', './src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        materialIcons: ['Material Symbols Outlined'],
      },
    },
  },
  plugins: [],
};
