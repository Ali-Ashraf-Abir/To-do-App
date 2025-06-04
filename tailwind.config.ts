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
        bgPrimaryLight: "var(--bg-primary-light)",
        bgSecondaryLight: "var(--bg-secondary-light)",
        textPrimaryLight: "var(--text-primary-light)",
        textSecondaryLight: "var(--text-secondary-light)",
        btnBgLight: "var(--btn-bg-light)",
        btnBgHoverLight: "var(--btn-bg-hover-light)",
        cardBgLight: "var(--card-bg-light)",

        bgPrimaryDark: "var(--bg-primary-dark)",
        bgSecondaryDark: "var(--bg-secondary-dark)",
        textPrimaryDark: "var(--text-primary-dark)",
        textSecondaryDark: "var(--text-secondary-dark)",
        btnBgDark: "var(--btn-bg-dark)",
        btnBgHoverDark: "var(--btn-bg-hover-dark)",
        cardBgDark: "var(--card-bg-dark)",
      },
    },
  },
  plugins: [],
};

export default config;
