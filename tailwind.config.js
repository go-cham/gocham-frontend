/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: '1.2rem',
      sm: '1.4rem',
      base: '1.6rem',
      lg: '1.8rem',
      xl: '2.0rem',
      '2xl': '2.2rem',
    },
    extend: {
      colors: {
        primary: '#f18721',
        secondary: '#434343',
        accept: '#51ab7c',
        error: '#ee7963',
        background: '#f5f7fb',
        text1: '#2A2D37',
        text2: '#676A72',
        text3: '#8F9299',
        text4: '#B0B2B8',
        gray1: '#CCCFD4',
        gray2: '#E1E3E7',
        gray3: '#F4F4F5',
      },
    },
  },
  plugins: [],
};
