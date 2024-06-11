/** @type {import('tailwindcss').Config} */

const colors = {
  'accent-purple': ' #C077CC',
  'news-color': '#0A97D0',
  'opinion-color': '#6DA81E',
  'arts-color': '#E98C1B',
  'sports-color': '#3744B5',
  'misc-color': '#1B8E50',
  'troubleshooting-color': '#D249BC',
};
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: Object.keys(colors).flatMap((color) => [
    `bg-${color}`,
    `group-hover:text-${color}`,
    `text-${color}`,
  ]),
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
