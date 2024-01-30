/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette_1: '#CAD2C5',
        palette_2: '#84A98C',
        palette_3: '#52796F',
        palette_4: '#354F52',
        palette_5: '#2F3E46',
        palette_6: '#1C262A',
        palette_7: '#0F1618'
      },
      padding: {
        '100percent': '100%',
      },
    },
  },
  plugins: [],
}

