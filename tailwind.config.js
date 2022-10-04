module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}"
    
  ],
  theme: {
    extend: {
      colors: {
        'nav-bg': '#0F2649',
        'main-bg': '#0A1A34',
        'topnav-bg': '#08152A'
      },
      backgroundImage: {
        'pattern': 'url(/images/pattern.svg)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
