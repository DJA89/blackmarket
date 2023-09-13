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
        'status/success/500': '#2FBE2C',
      },
      outlineOffset: {
        3: '3px',
      },
      spacing: {
        15: '3.75rem',
        23: '5.75rem',
        24: '6rem',
        30: '7.5rem',
        49: '12.25rem',
        51: '12.75rem',
        90: '22.5rem',
        106: '26.5rem',
        121: '30.25rem',
        139: '34.75rem',
        256: '64rem',
      },
      margin: {
        23: '5.75rem',
        30: '7.5rem',
      },
      maxWidth: {
        121: '30.25rem',
        360: '90rem',
      },
    },
  },
  plugins: [],
};
