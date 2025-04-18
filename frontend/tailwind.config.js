module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // hoặc cấu trúc của bạn
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f1f1f",
        secondary: "#2b2b2b",
        // Thêm các màu tùy chỉnh khác nếu cần
      },
      heights: {
        headerHeight: "h-[64px]",
      },
      margin: {
        marginHeader: "mt-18",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        // Thêm các font khác nếu cần
      },
    },
    // ...
  },
  plugins: [
    require("tailwind-scrollbar"),
    // ...
  ],
};
