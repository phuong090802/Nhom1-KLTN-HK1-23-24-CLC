/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2785DC',
        'ghost-white': '#EDEDED',
        'secondary': '#DAF8FF'
      },
      fontFamily: {
        'title': "Play"
      },
      keyframes: {
        'slide-down': {
          '0%': {
            maxHeight: '0px',
          },
          '100%': {
            maxHeight: '10000px',
          },
        },
      },
      animation: {
        'scale-in-ver-top': 'scale-in-ver-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
    },
  },
  plugins: [],
}
