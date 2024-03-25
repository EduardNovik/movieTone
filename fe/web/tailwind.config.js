// old version:
// const config = require('tailwind-config/tailwind.config');
// module.exports = config;

// new version:
import tailwindConfig from '@movieTone/tailwind-config/tailwind.config.js';

/* eslint-disable import/no-default-export, import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: { regBg: "url('./src/assets/bg_1.jpg')" },
      colors: {
        'gradient-dark':
          'linear-gradient(0deg, rgba(0,0,0,1) 1%, rgba(117,63,0,1) 100%)',
        myViolet: '#ee82ee',
        myGray: '#e1e7ef',
      },
    },
  },
  presets: [tailwindConfig],
};
