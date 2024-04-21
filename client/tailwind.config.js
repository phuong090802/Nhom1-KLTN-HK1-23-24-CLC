/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2785DC",
        secondary: "#1DDBD2",
        success: "#4BB543",
        // success: "#00FF00",
        error: "#ED1B24",
        warning: "#FFB818",
        light_gray: "#d3d3d3",
        black100: "rgba(36, 41, 45, 1)",
        black75: "rgba(36, 41, 45, 0.75)",
        black50: "rgba(36, 41, 45, 0.5)",
        black25: "rgba(36, 41, 45, 0.25)",
        black10: "rgba(36, 41, 45, 0.1)",
      },
    },
  },
  plugins: [],
};
