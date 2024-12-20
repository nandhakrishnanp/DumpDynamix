/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        monsherrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        Mochiy:["Mochiy Pop One", "sans-serif"],
        Inter:["Inter", "sans-serif"],
        Plus:["Plus Jakarta Sans", "sans-serif"]
      },
      colors: {
        primary: "#8338ec",
        pale: "#FCFFE7",
        Secondary: "#D9E4EA",
        darkblue: "#1F1926",
      },
    },
  },
  plugins: [],
};
