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
          650: "#344054",
          600: "#F3F3F3",
          500: "#697586",
          400: "#FBFBFB",
          75: "#F9FAFB",
        },
        dark: {
          900: "#000F1E",
        },
        blue: {
          600: "#1573FF",
          200: "#D8E7FF",
          main: "#0C6AFF",
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
      borderRadius: {
        "2md": "0.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
