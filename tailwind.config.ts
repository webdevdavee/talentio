import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F6F52",
      },
    },
    screens: {
      ss: { max: "290px" },
      sm: { max: "320px" },
      m: { max: "767px" },
      xl: { min: "768px", max: "1024px" },
      xxl: { min: "1025px", max: "1279px" },
      xxxl: { min: "1280px" },
      ultra: { min: "1500px" },
    },
  },
  plugins: [],
};
export default config;
