import { tailwindColors } from './colorPalette'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      colors: {
        palette_1: tailwindColors.palette_1,
        palette_2: tailwindColors.palette_2,
        palette_3: tailwindColors.palette_3,
        palette_4: tailwindColors.palette_4,
        palette_5: tailwindColors.palette_5,
        palette_6: tailwindColors.palette_6,
        palette_7: tailwindColors.palette_7
      },
      padding: {
        '100percent': '100%',
      },
    },
  },
  plugins: [],
}

