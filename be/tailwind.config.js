// old version:
// const config = require('tailwind-config/tailwind.config');
// module.exports = config;

// new version:
import tailwindConfig from '../../packages/tailwind-config/tailwind.config.js';

/* eslint-disable import/no-default-export, import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [tailwindConfig],
};
