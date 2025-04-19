export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        swipeLeft: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-500px)', opacity: 0 },
        },
        swipeRight: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(500px)', opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        swipeLeft: 'swipeLeft 0.5s ease-in-out forwards',
        swipeRight: 'swipeRight 0.5s ease-in-out forwards',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [require('daisyui')],
}
