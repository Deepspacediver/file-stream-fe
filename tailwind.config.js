/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "col-white": "#FFFFFF",
        "col-white-transparent": "rgba(240, 240, 240, .25)",
        "col-purple": "#53118F",
        "col-purple-light": "#4c26ea",
        "col-black": "#000000",
        "col-error": "#FFA07A",
      },
      backgroundImage: {
        gradient: `radial-gradient(circle farthest-corner at 10% 20%,  rgba(100,43,115,1) 0%, rgba(4,0,4,1) 90% )`,
        "gradient-vertical": `linear-gradient(180deg, rgb(57, 31, 105) -2.3%, rgb(115, 57, 178) 54.4%, rgb(231, 75, 184) 100.4%);`,
      },
      boxShadow: {
        "box-360": `rgba(0, 0, 0, 0.35) 0px 5px 15px;`,
      },
    },
  },
  plugins: [],
};
