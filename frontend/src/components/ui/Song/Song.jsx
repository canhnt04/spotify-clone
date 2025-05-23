import { Play } from "lucide-react";
import React from "react";

const Song = () => {
  return (
    <div className="group flex items-center gap-4 my-2 px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer rounded-md">
      <div className="relative w-12 h-12">
        {/* Ảnh nằm dưới */}
        <img
          src="https://i.scdn.co/image/ab67616d00001e024594668d4629f899daba689a"
          alt="song"
          className="w-full h-full rounded z-0"
        />

        {/* Play icon đè lên và hiện khi hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded z-10 opacity-0 group-   hover:opacity-100 transition duration-200">
          <Play size={24} className="text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-white text-sm font-semibold line-clamp-1">
          Nước mắt cá sấu
        </span>
        <span className="text-gray-400 text-xs">HIEUTHUHAI</span>
      </div>
    </div>
  );
};

export default Song;
