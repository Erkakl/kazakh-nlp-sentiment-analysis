/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#07111f",
        midnight: "#0a1020",
        cyanSoft: "#67e8f9",
        mintSoft: "#86efac",
        roseSoft: "#fda4af",
        amberSoft: "#fcd34d",
      },
      boxShadow: {
        glass: "0 24px 80px rgba(0, 0, 0, 0.28)",
      },
    },
  },
  plugins: [],
};
