import { HeartPlus, Play } from "lucide-react";
import favoriteImage from "../../../assets/images/favorite_song.jpg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";
const LibraryItem = ({ album, user, favorite, video, isFooter }) => {
  const navigate = useNavigate();
  const { defaulAvatar } = useContext(StoreContext);
  const handleTypeData = () => {
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

    if (video) {
      return (type = video?.artist);
    }

    return "";
  };

  const handChooseItem = () => {
    if (video) {
      console.log(video?.id);
      navigate(`/video/${video?.id}`);
      return;
    }
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

  const handleImageSrc = () => {
    if (album?.thumbnail_url) return album?.thumbnail_url;
    if (video?.thumbnail_url) return video?.thumbnail_url;
    if (user || user?.avatar) return user?.avatar || defaulAvatar;
    return favoriteImage;
  };

  return (
    <div
      className="group flex items-center gap-4 my-2 p-2 cursor-pointer rounded-md hover:bg-[#2a2a2a] transition"
      onClick={handChooseItem}
    >
      <div className="relative w-14 h-14">
        {/* Ảnh nằm dưới */}
        <img
          src={handleImageSrc()}
          alt="image"
          className={`w-full h-full ${user ? "rounded-full" : "rounded"} z-0`}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-white text-sm font-semibold line-clamp-1">
          {album?.name || video?.title || user?.full_name || "Bài hát đã thích"}
        </span>
        <span className="text-gray-400 text-xs">
          {handleTypeData()}
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
