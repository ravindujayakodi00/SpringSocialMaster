/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode based on the 'dark' class

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255,255,255,0.25)",
        brown: "rgb(30, 30, 17);"
      },
      fontSize: {
        xxs: '0.625rem',
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      }
    },
    backgroundImage: {
      back: "url(./assets/background.svg)"
    }
  },
  variants: {},
  plugins: [],
}
