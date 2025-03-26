/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#00ffff", // Cyan Neon Glow
        darkBg: "#0a0f1a", // Futuristic Dark Background
      },
      boxShadow: {
        neon: "0 0 10px #00ffff", // Neon Glow Effect
      },
      backdropBlur: {
        xs: "2px",
        sm: "8px",
        md: "12px",
      },
    },
  },
  plugins: [],
};
