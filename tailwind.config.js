/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F3F4F6",
        primary: "#1DA1F2",
        secondary: "#14171A",
        accent: "#657786",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      screens: {
        xs: "475px",
        "3xl": "1600px",
      },
      boxShadow: {
        custom: "0 4px 30px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};
