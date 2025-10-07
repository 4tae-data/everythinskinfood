/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#FAF7F2", // light beige background
          DEFAULT: "#C4A484", // main light brown accent
          dark: "#A67B5B", // darker hover brown
        },
        textcolor: {
          base: "#3B2F2F", // rich dark brown text
          light: "#6B5E55", // lighter secondary text
        },
      },
    },
  },
  plugins: [],
};
