/** @types {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import { customColors } from './src/styles/colors';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xl: '1300px',
    },
    extend: {
      colors: customColors,
      boxShadow: {
        feed: '0 8px 20px 0 rgba(34, 34, 34, 0.10)',
        header: '0 0.33000001311302185px 0 0 rgba(34, 34, 34, 0.30)',
        dropdown: '0 4px 16px 0 rgba(42, 45, 55, 0.12)',
      },
      fontFamily: {
        pretendard: ['Pretendard', ...fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.font-system-heading1': {
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '700',
          fontSize: '1.8rem',
          lineHeight: '2.7rem',
          letterSpacing: '-0.54px',
        },
        '.font-system-heading2': {
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '700',
          fontSize: '1.6rem',
          lineHeight: '2.4rem',
        },
        '.font-system-body5': {
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '500',
          fontSize: '1.6rem',
          lineHeight: '2.4rem',
          letterSpacing: '-0.48px',
        },
        '.font-system-body4': {
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '500',
          fontSize: '1.4rem',
          lineHeight: '2.1rem',
          letterSpacing: '-0.42px',
        },
        '.font-system-body3': {
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '400',
          fontSize: '1.4rem',
          lineHeight: '2.1rem',
          letterSpacing: '-0.42px',
        },
        '.font-system-body2': {
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '500',
          fontSize: '1.2rem',
          lineHeight: '1.8rem',
          letterSpacing: '-0.36px',
        },
        '.font-system-body1': {
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '400',
          fontSize: '1.2rem',
          lineHeight: '1.8rem',
          letterSpacing: '-0.36px',
        },
        '.font-system-caption': {
          fontFamily: 'Pretendard, sans-serif',
          fontWeight: '500',
          fontSize: '1rem',
          lineHeight: '1.5rem',
          letterSpacing: '-0.3px',
        },
        '.font-custom-hero': {
          fontFamily: 'Elice Digital Baeum, sans-serif',
          fontWeight: '700',
          fontSize: '2.6rem',
          lineHeight: '3.9rem',
        },
        '.font-custom-heading1': {
          fontFamily: 'Elice Digital Baeum, sans-serif',
          fontWeight: '700',
          fontSize: '2rem',
          lineHeight: '3rem',
          letterSpacing: '-0.6px',
        },
        '.font-custom-heading2': {
          fontFamily: 'Elice Digital Baeum, sans-serif',
          fontWeight: '700',
          fontSize: '1.6rem',
          lineHeight: '2.4rem',
          letterSpacing: '-0.48px',
        },
        '.font-custom-subheading': {
          fontFamily: 'Elice Digital Baeum, sans-serif',
          fontWeight: '700',
          fontSize: '1.4rem',
          lineHeight: '2.1rem',
        },
        '.font-custom-body1': {
          fontFamily: 'Elice Digital Baeum, sans-serif',
          fontWeight: '400',
          fontSize: '1.2rem',
          lineHeight: '1.8rem',
          letterSpacing: '-0.36px',
        },
      });
    }),
  ],
};
