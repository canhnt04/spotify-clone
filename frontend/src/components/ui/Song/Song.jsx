import { HeartMinus, HeartPlus, Play, Plus } from "lucide-react";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { addFavoriteSong, deleteFavoriteSong } from "../../../apis/songService";
import { ToastContext } from "../../../contexts/ToastContext";

const Song = ({ data, isFooter, className, onClickFooter }) => {
  const { currentSong, setCurrentSong, favoriteSongs, fetchFavoriteSongs } =
    useContext(StoreContext);
  const { toast } = useContext(ToastContext);
  const isExsitsFavoriteSong = favoriteSongs?.find(
    (item) => item.id == data.id
  );

  const handleAddAndDeleteFavoriteSong = async () => {
    const action = isExsitsFavoriteSong ? "delete" : "add";
    const songId = data.id;

    try {
      let res;
      if (action === "add") {
        res = await addFavoriteSong(songId);
      } else {
        res = await deleteFavoriteSong(songId);
      }

      if (res?.data) {
        await fetchFavoriteSongs();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.message || "Đã xảy ra lỗi");
    }
  };
  useEffect(() => {
    console.log("Song in footer re-render");
  }, [favoriteSongs]);
  return (
    <div
      className={
        className ||
        `group flex items-center gap-4 my-2 px-4 py-2 cursor-pointer rounded-md ${
          currentSong?.id === data?.id ? "bg-[#2a2a2a]" : ""
        }`
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
          <button
            className="absolute inset-0 flex items-center justify-center bg-opacity-40 rounded z-10 opacity-0 group-   hover:opacity-100 transition duration-200"
            onClick={() => {
              setCurrentSong(data);
              console.log(data);
            }}
          >
            <Play size={24} className="text-white" />
          </button>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-white text-sm font-semibold line-clamp-1">
          {data?.title || data?.name}
        </span>
        <span className="text-gray-400 text-xs">{data?.artist || ""}</span>
      </div>
      {isFooter && (
        <Tippy
          content={
            !isExsitsFavoriteSong
              ? "Thêm vào Bài yêu thích"
              : "Xóa khỏi Bài hát yêu"
          }
        >
          <button
            className="ml-2 border-2 border-gray-600 [#2a2a2a] rounded-full w-6 h-6 flex items-center justify-center text-xs text-white cursor-pointer"
            onClick={handleAddAndDeleteFavoriteSong}
          >
            {!isExsitsFavoriteSong ? (
              <HeartPlus size={14} strokeWidth={3} />
            ) : (
              <HeartMinus size={14} strokeWidth={3} />
            )}
          </button>
        </Tippy>
      )}
    </div>
  );
};

export default Song;
