/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#F5A044',
        'dark-bg': '#11112D',
        emerald: {
          400: '#8795FF',
          500: '#3548B5',
          600: '#293999',
          900: '#17193F',
        },
        lime: {
          300: '#C0C8FF',
        },
        teal: {
          500: '#5364D6',
        },
        green: {
          500: '#3548B5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
