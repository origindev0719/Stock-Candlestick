/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#E0F64E', 
        'green': '#1ABC7B',
        'red': '#F13005',
        'gray': {
          DEFAULT: '#B8B8B8', // Your default gray
          '100': '#F7FAFC',
          '200': '#EDF2F7',
          '300': '#E2E8F0',
          '400': '#CBD5E0',
          '500': '#A0AEC0',
          '600': '#718096',
          '700': '#4A5568',
          '800': '#2D3748',
          '900': '#1A202C',
        },
        'lightGray': '#EBEBEB',
        'black': '#171717',
      }
    },
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
     },
    screens: {
      'xs': '450px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}
