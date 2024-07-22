import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  // theme: {
  //   extend: {
  //     fontSize: {
  //       'sm': '6px',
  //       'md': '8px',
  //       'lg': '12px',
  //     },
  //     screens: {
  //       "xs": '450px',
  //       'sm': '640px',
  //       'md': '768px',
  //       'lg': '1024px',
  //       'xl': '1280px',
  //     },
  //   },
  // },
  prefix: '',
  plugins: [
    require('daisyui'),
  ],
};

export default config;
