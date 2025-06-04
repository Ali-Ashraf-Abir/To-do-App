import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌤️ Light mode (Cool & Soft) - keep as is or adjust as needed
        bgPrimaryLight: "#E8F0F2",
        bgSecondaryLight: "#D9E4DD",
        textPrimaryLight: "#4A5C6A",
        textSecondaryLight: "#7C8B94",
        btnBgLight: "#6C9A8B",
        btnBgHoverLight: "#4E7C6C",
        cardBgLight: "#F9FAFB",

        // 🌙 Dark mode (Retro palette you provided)
        bgPrimaryDark: "#222831",
        bgSecondaryDark: "#393E46",
        textPrimaryDark: "#DFD0B8",
        textSecondaryDark: "#948979",
        btnBgDark: "#948979",
        btnBgHoverDark: "#DFD0B8",
        cardBgDark: "#393E46",
      },
    },
  },
  plugins: [],
};

export default config;
