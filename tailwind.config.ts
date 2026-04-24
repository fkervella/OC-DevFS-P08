import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./_components/**/*.{js,ts,jsx,tsx}",
    "./app/context/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainRed: "#99331A",
        grayLight: "#F7F7F7",
        grayDark: "#4F4F4F",
        darkOrange: "#842C16",
        lightOrange: "#FFFBF9",
        black: "#0D0D0D",
        white: "#FFFFFF",
        pinkLight: "#DABFB8",
        redFont: "#EF4444",
      },
    },
  },
  plugins: [],
};

export default config;
