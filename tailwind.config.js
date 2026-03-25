/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'nelson-blue': '#00BADC',
        'nelson-charcoal': '#3D4858',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        didot: ['DidotLTStd', 'serif'],
      },
    },
  },
  plugins: [],
}
