/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      display: 'Rockwell, ui-serif',
      lato: 'Lato, ui-serif',
    },
    colors: {
      BACKGROUND: '#FFFEE4',
      BOXBGRD: '#FCFCFC',
      NEWS: '#0A97D0', // blue
      OPINION: '#6DA81E', // green
      ARTS: '#E98C1B', // orange
      SPORTS: '#3744B5', // dark blue
      MISCELLANEOUS: '#1B8E50', // dark green
      TROUBLESHOOTING: '#D249BC', // magenta
      ERRORMSG: '#CF0000', // red
      EDITMODE: '#732580', //dark purple
      BLACK: '#000000', // black
      WHITE: '#FCFCFC', //white
      QUICKLINKS: '#C077CC', // light purple
    },
    extend: {
      fontSize: {
        'boxhead': ['1.125rem', {
          lineHeight: '28.8px',
          fontWeight: '700',
        }],
      },
      borderWidth: {
        '3': '3px',
      },
      container: {
        custom:{
          center: true,
          padding: '1rem',
          borderRadius: '0.5rem',
          borderColor: '#000000',
          borderWidth: '3px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }
      }
    },

  },
  plugins: [],
};

