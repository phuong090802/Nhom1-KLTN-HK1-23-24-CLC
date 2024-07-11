/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2785DC",
        secondary: "#1DDBD2",
        success: "#4BB543",
        error: "#ED1B24",
        warning: "#FFB818",
        light_gray: "#d3d3d3",
        black100: "rgba(36, 41, 45, 1)",
        black75: "rgba(36, 41, 45, 0.75)",
        black50: "rgba(36, 41, 45, 0.5)",
        black25: "rgba(36, 41, 45, 0.25)",
        black10: "rgba(36, 41, 45, 0.1)",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
