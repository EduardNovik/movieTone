// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//         'gradient-conic':
//           'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//       },
//     },
//   },
//   plugins: [],
// }
// export default config

// import tailwindConfig from "../../packages/tailwind-config/tailwind.config.js";

// /* eslint-disable import/no-default-export, import/no-anonymous-default-export */
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
//   ],
//   presets: [tailwindConfig],
// };

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{ts,tsx}", "../../../packages/ui/src/**/*.{ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         brand: ["Syncopate", "sans-serif"],
//       },
//       dropShadow: {
//         "3xl": "0 0 12px rgba(0, 0, 0, 0.36)",
//       },
//     },
//   },
//   presets: [require("../../../packages/tailwind-config/tailwind.config")],
// };

import tailwindConfig from "../../packages/tailwind-config/package.json";

/* eslint-disable import/no-default-export, import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [tailwindConfig],
};
