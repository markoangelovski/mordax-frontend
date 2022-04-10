module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    function ({ addVariant }) {
      // https://stackoverflow.com/questions/67119992/how-to-access-all-the-direct-children-of-a-div-in-tailwindcss
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    }
  ]
};
