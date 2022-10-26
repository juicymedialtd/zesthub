module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "nav-bg": "#0F2649",
        "main-bg": "#0A1A34",
        "topnav-bg": "#08152A",
        primary: "#F59E1E",
        secondary: "#F8AF3B",
      },
      backgroundImage: {
        pattern: "url(/images/pattern.svg)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
