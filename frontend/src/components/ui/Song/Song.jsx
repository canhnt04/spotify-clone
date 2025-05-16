import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { HeartMinus, HeartPlus, Play, Plus } from "lucide-react";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";
import { useFavoriteSong } from "../../hooks/useFavoriteSong";

const Song = ({ data, isFooter, className, onClickFooter }) => {
  const {
    currentSong,
    setCurrentSong,
    favoriteSongs,
    fetchFavoriteSongs,
    noImage,
  } = useContext(StoreContext);

  const { checkIsExsitSongInLibrary, handleAddAndDeleteFavoriteSong } =
    useFavoriteSong();

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
          src={data?.thumbnail_url || noImage}
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
            !checkIsExsitSongInLibrary(data?.id)
              ? "Thêm vào Bài yêu thích"
              : "Xóa khỏi Bài hát yêu"
          }
        >
          <button
            className="ml-2 border-2 border-gray-600 [#2a2a2a] rounded-full w-6 h-6 flex items-center justify-center text-xs text-white cursor-pointer"
            onClick={() => handleAddAndDeleteFavoriteSong(data?.id)}
          >
            {!checkIsExsitSongInLibrary(data?.id) ? (
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
