/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'not-authenticated':
          "url('../../public/not-authenticated/background.png')",
      },
      colors: {
        active: '#254A96',
        'active-outline': '#9EBBF3',
        background: '#F4F7FA',
        'dark-grey': '#636363',
        'dark-violet': '#00031A',
        focus: '#1D76EF',
        hover: '#446CBC',
        'light-grey': '#E0E0E0',
        links: '#076CE0',
      },
      outlineOffset: {
        3: '3px',
      },
      spacing: {
        89: '22.5rem',
        106: '26.5rem',
        139: '34.75rem',
      },
      margin: {
        23: '5.75rem',
        30: '7.5rem',
      },
    },
  },
  plugins: [],
};
