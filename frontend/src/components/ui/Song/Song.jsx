import { HeartPlus, Play } from "lucide-react";
const Song = ({ data, isFooter, className }) => {
  return (
    <div
      className={
        className ||
        "group flex items-center gap-4 my-2 px-4 py-2 cursor-pointer rounded-md hover:bg-[#2a2a2a]}"
      }
    >
      <div className="relative w-12 h-12">
        {/* Ảnh nằm dưới */}
        <img
          src={
            data?.thumbnail_url ||
            "https://i.scdn.co/image/ab67616d00001e024594668d4629f899daba689a"
          }
          alt="song"
          className="w-full h-full rounded z-0"
        />

        {/* Play icon đè lên và hiện khi hover */}
        {!isFooter && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded z-10 opacity-0 group-   hover:opacity-100 transition duration-200">
            <Play size={24} className="text-white" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-white text-sm font-semibold line-clamp-1">
          {data?.title || "Nước mắt cá sấu"}
        </span>
        <span className="text-gray-400 text-xs">
          {data?.artist || "HIEUTHUHAI"}
        </span>
      </div>
      {isFooter && (
        <button className="ml-2 border border-gray-600 hover:bg-[#2a2a2a] rounded-full w-6 h-6 flex items-center justify-center text-xs text-white cursor-pointer">
          <HeartPlus size={14} />
        </button>
      )}
    </div>
  );
};

export default Song;
