/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: { min: "350px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px" },
      // => @media (min-width: 768px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      
      keyframes: {
        slideIn: {
          "0%":{
            opacity: 0,
            transform: "translateY(100px)",
            

            
          }, 
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation:{
        slideIn:"slideIn 2s ease-in "
      }
    },
  },
  plugins: [],
  darkMode: "class",
};
