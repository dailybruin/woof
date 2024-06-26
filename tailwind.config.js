/** @type {import('tailwindcss').Config} */
const ACCENT_PURPLE = '#C077CC';

const dynamicRouteColors = {
  'all-color': ACCENT_PURPLE,
  'news-color': '#0A97D0',
  'opinion-color': '#6DA81E',
  'arts-color': '#E98C1B',
  'sports-color': '#3744B5',
  'misc-color': '#1B8E50',
  'troubleshooting-color': '#D249BC',
  'new-color': ACCENT_PURPLE,
};
const otherDynamicColors = {
  'accent-purple': ACCENT_PURPLE,
};
const dynamicColors = {
  ...dynamicRouteColors,
  ...otherDynamicColors,
};
const customColors = {
  white: '#FCFCFC',
};
const colors = { ...dynamicColors, ...customColors };

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: Object.keys(dynamicColors).flatMap((color) => [
    `bg-${color}`,
    `group-hover:text-${color}`,
    `text-${color}`,
    `border-${color}`,
  ]),
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        display: ['Rockwell', 'Courier New', 'Times New Roman'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
