import React from "react";
import logo from "../assets/images/logo.jpg"; // Đường dẫn đến logo của bạn
import Button from "../components/ui/Button/Button";
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Logo Spotify hoặc thay bằng hình ảnh khác */}
      <img
        src={logo}
        alt="Spotify Logo"
        className="w-16 h-16 rounded-full mb-6"
      />

      <h1 className="text-3xl md:text-4xl font-bold">Không tìm thấy trang</h1>
      <p className="text-gray-400 mt-2 mb-6 text-center">
        Chúng tôi không tìm thấy trang bạn muốn tìm.
      </p>

      <Button
        onClick={() => (window.location.href = "/")}
        className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:opacity-90 transition duration-300"
      >
        Trang chủ
      </Button>
    </div>
  );
};

export default NotFound;
