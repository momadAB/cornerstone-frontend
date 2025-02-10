/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        maven: ['"Maven Pro"', "sans-serif"], // Add Maven Pro font
      },
      colors: {
        gold: {
          400: "#D4AF37",
          500: "#C5A028",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        sidebar: {
          DEFAULT: "#0B1638",
          text: "#FFFFFF",
          muted: "#232D4C",
          "muted-foreground": "#B0BCCC",
          accent: "#FFDD44",
          "accent-foreground": "#0B1638",
          border: "#2D3A5C",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.85 },
        },
        "glow-fade": {
          "0%": { opacity: 0.3, filter: "blur(3px)" },
          "50%": { opacity: 1, filter: "blur(6px)" },
          "100%": { opacity: 0.3, filter: "blur(3px)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(25%)", opacity: "0.7" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        "slide-up-slow": {
          "0%": { transform: "translateY(0%)", opacity: "0.85" },
          "100%": { transform: "translateY(-30%)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.85)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        "rotate-hover": {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(3deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "horizontal-float": {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(35px)" },
        },
        "vertical-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(35px)" },
        },
        "diagonal-float": {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(35px, 35px)" },
        },
        "move-right-rotate": {
          "0%": {
            transform: "translateX(0) rotate(0deg)",
            opacity: 0.2,
          },
          "50%": {
            opacity: 0.5,
          },
          "100%": {
            transform: "translateX(100vw) rotate(360deg)",
            opacity: 0,
          },
        },
        bgmove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out forwards",
        "fade-in-right": "fade-in-right 0.6s ease-out forwards",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "glow-fade": "glow-fade 3s ease-in-out infinite",
        "slide-in": "slide-in 0.3s ease-out forwards",
        "slide-up": "slide-up 14s linear infinite",
        "slide-up-slow": "slide-up-slow 18s linear infinite",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "rotate-hover": "rotate-hover 1.3s ease-in-out infinite",
        "horizontal-float": "horizontal-float 9s ease-in-out infinite",
        "vertical-float": "vertical-float 11s ease-in-out infinite",
        "diagonal-float": "diagonal-float 13s ease-in-out infinite",
        "move-right-rotate": "move-right-rotate 15s linear infinite",
        bgmove: "bgmove 40s infinite",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
