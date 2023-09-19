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
        17: '4.25rem',
        22: '5.5rem',
        23: '5.75rem',
        24: '6rem',
        26: '6.5rem',
        29: '7.25rem',
        30: '7.5rem',
        31: '7.75rem',
        39: '9.75rem',
        49: '12.25rem',
        51: '12.75rem',
        58: '14.5rem',
        62: '15.5rem',
        67: '16.75rem',
        88: '22rem',
        90: '22.5rem',
        91: '22.75rem',
        106: '26.5rem',
        121: '30.25rem',
        138: '34.5rem',
        139: '34.75rem',
        171: '42.75rem',
        256: '64rem',
        274: '68.5rem',
      },
      margin: {
        23: '5.75rem',
        30: '7.5rem',
      },
      maxWidth: {
        121: '30.25rem',
        274: '68.5rem',
        360: '90rem',
      },
    },
  },
  plugins: [],
};
