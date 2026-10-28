/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spa: {
          50: '#fbf9f6',
          100: '#f5f0e9',
          200: '#ebdfd0',
          300: '#dfcaa8',
          400: '#ceaf80',
          500: '#b8925d',
          600: '#9e7545',
          700: '#7e5a37',
          800: '#644830',
          900: '#523c2a',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e5ece5',
          200: '#ceddce',
          300: '#abc4ab',
          400: '#83a583',
          500: '#628762',
          600: '#4c6c4c',
          700: '#3e563e',
          800: '#344634',
          900: '#2c3a2c',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

