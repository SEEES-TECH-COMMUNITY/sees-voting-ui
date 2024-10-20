import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          800: "#AAA",
          700: "#A7B5C1",
          650: "#6D6D6D",
          600: "#F3F3F3",
          400: "#FBFBFB",
        },
        dark: {
          900: "#000F1E",
        },
        blue: {
          600: "#1573FF",
          200: "#D8E7FF",
          placeholder: {
            600: "#002445",
          },
        },
        red: {
          500: "#FF1515",
        },
        green: {
          800: "#249607",
          500: "#00B298",
          300: "#D5FFCB",
        },
        yellow: {
          800: "#F2A102",
          300: "#FFFACB",
        },
      },
    },
  },
  plugins: [],
};
export default config;
