/** @types {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xl: '1300px',
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
      backgroundImage: {
        'with-character': "url('src/images/background.png')",
        'without-character': "url('src/images/background_nocharVer.png')",
      },
    },
  },
  plugins: [],
};
