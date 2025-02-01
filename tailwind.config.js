export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        card: "moveCard 4s infinite",
      },
      keyframes: {
        moveCard: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(50px)" },
        },
      },
    },
  },
  plugins: [],
};