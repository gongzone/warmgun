import { withTV } from "tailwind-variants/transformer"
import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

import { tailwindAnimate } from "./src/styles/tailwind-animate"

const config: Config = withTV({
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-pretendard)", ...fontFamily.sans],
        heading: ["var(--font-tenada)", ...fontFamily.sans],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "foreground-light": "hsl(var(--foreground-light))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ring: "hsl(var(--ring))",
        primary: {
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          500: "hsl(var(--primary-500))",
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          foreground: "hsl(var(--primary-foreground))",
          DEFAULT: "hsl(var(--primary-500))",
        },
        success: {
          100: "hsl(var(--success-100))",
          200: "hsl(var(--success-200))",
          300: "hsl(var(--success-300))",
          400: "hsl(var(--success-400))",
          500: "hsl(var(--success-500))",
          600: "hsl(var(--success-600))",
          700: "hsl(var(--success-700))",
          800: "hsl(var(--success-800))",
          900: "hsl(var(--success-900))",
          foreground: "hsl(var(--success-foreground))",
          DEFAULT: "hsl(var(--success-500))",
        },
        warning: {
          100: "hsl(var(--warning-100))",
          200: "hsl(var(--warning-200))",
          300: "hsl(var(--warning-300))",
          400: "hsl(var(--warning-400))",
          500: "hsl(var(--warning-500))",
          600: "hsl(var(--warning-600))",
          700: "hsl(var(--warning-700))",
          800: "hsl(var(--warning-800))",
          900: "hsl(var(--warning-900))",
          foreground: "hsl(var(--warning-foreground))",
          DEFAULT: "hsl(var(--warning-500))",
        },
        danger: {
          100: "hsl(var(--danger-100))",
          200: "hsl(var(--danger-200))",
          300: "hsl(var(--danger-300))",
          400: "hsl(var(--danger-400))",
          500: "hsl(var(--danger-500))",
          600: "hsl(var(--danger-600))",
          700: "hsl(var(--danger-700))",
          800: "hsl(var(--danger-800))",
          900: "hsl(var(--danger-900))",
          foreground: "hsl(var(--danger-foreground))",
          DEFAULT: "hsl(var(--danger-500))",
        },
      },
      borderColor: {
        DEFAULT: "hsl(var(--border))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [tailwindAnimate],
})

export default config
