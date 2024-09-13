import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "2xs": ["0.69rem", { lineHeight: "0.78rem" }],
      },
      colors: {
        primary: {
          light: "#6FCF97",
          DEFAULT: "#3AA757",
          dark: "#2E7D32",
        },
        secondary: {
          light: "#F5B461",
          DEFAULT: "#F28D17",
          dark: "#C05600",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
