// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["src/**/*.{js,ts,jsx,tsx}"],
//   presets: [require("../tailwind-config/tailwind.config.js")],
// };

// import tailwindConfig from "../tailwind-config/tailwind.config";

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   presets: [tailwindConfig],
// };

// import type { Config } from "tailwindcss";
// import sharedConfig from "tailwind-config/tailwind.config.ts";

// const config: Pick<Config, "prefix" | "presets"> = {
//   prefix: "ui-",
//   presets: [sharedConfig],
// };

// export default config;


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{js,ts,jsx,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [require( "tailwind-config/tailwind.config.ts" )],
}

