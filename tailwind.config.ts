import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customDark: "#06000E",
        customRed: "#C52344",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        "3xl": "0 25px 50px -12px #000000",
        "4xl": "0 30px 60px -15px #C52344",
        'glow': '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2), 0 0 50px rgba(255, 255, 255, 0.1)',
        'redglow': '0 0 10px rgba(197, 35, 68, 0.5), 0 0 20px rgba(197, 35, 68, 0.4), 0 0 30px rgba(197, 35, 68, 0.3), 0 0 40px rgba(197, 35, 68, 0.2), 0 0 50px rgba(197, 35, 68, 0.1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities } : PluginAPI) {
      addUtilities({
        '.text-shadow-glow': {
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2), 0 0 50px rgba(255, 255, 255, 0.1)',
        },
        '.text-shadow-redglow': {
          textShadow: '0 0 10px rgba(197, 35, 68, 0.5), 0 0 20px rgba(197, 35, 68, 0.4), 0 0 30px rgba(197, 35, 68, 0.3), 0 0 40px rgba(197, 35, 68, 0.2), 0 0 50px rgba(197, 35, 68, 0.1)',
        },
        '::selection': {
          backgroundColor: '#FFFFFF',
          color: '#C52344',
        },
      });
    },
  ],
};
export default config;
