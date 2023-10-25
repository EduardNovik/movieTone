/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "0 0 12px rgba(0, 0, 0, 0.36)",
      },
    },
  },
  presets: [require("tailwind-config/tailwind.config")],
};
