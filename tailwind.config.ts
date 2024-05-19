import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxs: "359px",
      xs: "379px",
      sm: "420px",
      md: "900px",
      lg: "1200px",
      xl: "1500px"
    },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      md: ["20px", "28px"],
      lg: ["24px", "32px"],
      xl: ["32px", "36px"],
    },
    extend: {
      colors: {
        "primary": "#374151",
        "grey": "#6B7280",
        "secondary-dark": "#868686",
        "secondary": "#A1A1A1",
        "orange": "#F07846",
        "yellow": "#FDBA2D",
      },
      backgroundColor: {
        "primary": "#F7F7F7",
        "secondary": "#F5F5F5"
      },
      fontFamily: {
        bricolage: ['var(--font-bricolage)'],
        mono: ['var(--font-roboto-mono)'],
      },
      boxShadow: {
        "btn": "0px -3px 0px 3px rgba(0, 0, 0, 0.15) inset",
        "country": "0px 8px 16px 0px rgba(17, 17, 17, 0.08)",
      },
      rotate: {
        "360": "360deg"
      }
    },
  },
  plugins: [],
};
export default config;