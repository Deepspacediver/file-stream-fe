/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "col-white": "#FFFFFF",
        "col-purple": "#53118F",
        "col-black": "000000",
      },
      backgroundImage: {
        gradient: `radial-gradient(circle farthest-corner at 10% 20%,  rgba(100,43,115,1) 0%, rgba(4,0,4,1) 90% )`,
      },
    },
  },
  plugins: [],
};
