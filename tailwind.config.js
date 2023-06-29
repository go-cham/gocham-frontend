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

        custom: {
          main: {
            50: '#fff5ee',
            100: '#ffeddf',
            200: '#ffd7bf',
            300: '#ffbc9f',
            400: '#ffa387',
            500: '#ff7860',
            600: '#db5146',
            700: '#b73030',
            800: '#931e28',
            900: '#7a1223',
          },
          sub: {
            pink: {
              50: '#fffbfa',
              100: '#fff9f6',
              200: '#fff2ed',
              300: '#ffe9e5',
              400: '#ffe1de',
              500: '#ffd4d4',
              600: '#db9aa0',
              700: '#b76a78',
              800: '#934358',
              900: '#7a2845',
            },
            blue: {
              50: '#f4fcff',
              100: '#ebfaff',
              200: '#d7f4ff',
              300: '#c3ebff',
              400: '#b3e2ff',
              500: '#9bd4ff',
              600: '#71a7db',
              700: '#4e7eb7',
              800: '#315893',
              900: '#1d3d7a',
            },
          },
          semantic: {
            success: {
              50: '#f7fdf0',
              100: '#f1fde2',
              200: '#dffbc5',
              300: '#c6f4a5',
              400: '#acea8b',
              500: '#87dd66',
              600: '#62be4a',
              700: '#429f33',
              800: '#278020',
              900: '#136a13',
            },
            inform: {
              50: '#e4fdfe',
              100: '#cbfcfe',
              200: '#98f4fe',
              300: '#65e3fd',
              400: '#3ecffb',
              500: '#00aef9',
              600: '#0087d6',
              700: '#0065b3',
              800: '#004790',
              900: '#003377',
            },
            warn: {
              50: '#fff2ed',
              100: '#ffe6dd',
              200: '#ffc8bb',
              300: '#ffa399',
              400: '#ff8180',
              500: '#ff5664',
              600: '#db3e59',
              700: '#b72b50',
              800: '#931b46',
              900: '#7a103f',
            },
          },
          gray: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#222222',
          },
          text: {
            400: '#bdbdbd',
            500: '#9e9e9e',
            700: '#616161',
            900: '#222222',
          },
          background: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
          },
        },
      },
      backgroundImage: {
        'with-character': "url('src/images/background.png')",
        'without-character': "url('src/images/background_nocharVer.png')",
      },
    },
  },
  plugins: [],
};
