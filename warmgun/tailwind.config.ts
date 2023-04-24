import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-nanum-square-neo)", ...fontFamily.sans],
        logo: ["var(--font-concert-one)", ...fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      {
        "dark-theme": {
          color: "#dedede",
          primary: "#dedede",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#e9e9e9",
          "base-100": "#171313",
          "base-200": "#222222",
          info: "#74bcff",
          success: "#AAEEC4",
          warning: "#FFF083",
          error: "#FA5D29",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
