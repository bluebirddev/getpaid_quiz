/** @type {import('tailwindcss').Config} */

module.exports = {
  safelist: [{ pattern: /grid-cols-\d+/, variants: ['sm', 'md', 'lg', 'xl'] }],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
