const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.jsx",
    "./src/**/*.js",
    "// Agrega aquí otras rutas de tus archivos de origen",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#92079e",
        "light-blue": "#3C6E71",
        "my-white": "#FFFFFF",
        "my-green": "#10B981",
        "my-blue": "#4299E1",
        "my-yellow": "#E9C46A",
        "my-pink": "#F472B6",
        "my-gray": "#D9D9D9",
        "my-red": "#CC2905",
        "my-black": "#353535",
      },
      screens:{
        'custom-max': {'max': '1340px'},
        'custom-min': {'min': '400px'},
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  variants: {},
  darkMode: "class",
  plugins: [nextui()],
}

