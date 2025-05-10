import { HeartPlus, Play } from "lucide-react";
import favoriteImage from "../../../assets/images/favorite_song.jpg";
import { useNavigate } from "react-router-dom";
const LibraryItem = ({ album, user, favorite, isFooter }) => {
  const navigate = useNavigate();
  const handeTypeData = () => {
    let type = "";
    if (album) {
      return (type = "Album");
    }
    if (user) {
      return (type = "Nghệ sĩ");
    }
    if (favorite) {
      return (type = "Danh sách phát");
    }
    return "";
  };

  const handChooseItem = () => {
    if (album) {
      navigate(`/album/detail/${album?.id}`);
      return;
    }
    if (user) {
      navigate(`/profile/${user?.id}`);
      return;
    }
    if (favorite) {
      navigate(`/favorite`);
      return;
    }
  };

  return (
    <div className="group flex items-center gap-4 my-2 p-2 cursor-pointer rounded-md hover:bg-[#2a2a2a] transition">
      <div className="relative w-14 h-14">
        {/* Ảnh nằm dưới */}
        <img
          src={album?.thumbnail_url || user?.avatar || favoriteImage}
          alt="image"
          className={`w-full h-full ${user ? "rounded-full" : "rounded"} z-0`}
        />

        {/* Play icon đè lên và hiện khi hover */}
        {!isFooter && (
          <button
            className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded z-10 opacity-0 group-   hover:opacity-100 transition duration-200"
            onClick={handChooseItem}
          >
            <Play size={24} className="text-white" />
          </button>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-white text-sm font-semibold line-clamp-1">
          {album?.name || user?.full_name || "Bài hát đã thích"}
        </span>
        <span className="text-gray-400 text-xs">
          {handeTypeData()}
          {(album || favorite) &&
            ` - ${
              album?.name || `${favorite?.total || favorite?.length} bài hát`
            }`}
        </span>
      </div>
      {isFooter && (
        <button className="ml-2 border border-gray-600 bg-red-500 hover:bg-[#2a2a2a] rounded-full w-6 h-6 flex items-center justify-center text-xs text-white cursor-pointer">
          <HeartPlus size={14} />
        </button>
      )}
    </div>
  );
};

export default LibraryItem;
