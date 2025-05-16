import React, { useContext, useEffect } from "react";
import {
  Play,
  MoreHorizontal,
  Pause,
  PawPrint,
  PlayCircle,
  Trash,
} from "lucide-react";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import formatTime from "../../../utils/formatTime";
import { StoreContext } from "../../../contexts/StoreProvider";
import ScaleLoader from "react-spinners/ScaleLoader";

const SongList = ({
  songs,
  fetchDeleteFavoriteSong,
  fetchDeleteSongFromAlbum,
}) => {
  const { currentSong, setCurrentSong } = useContext(StoreContext);
  useEffect(() => {}, [songs]);
  return (
    <div className="my-4 px-6 py-4 text-sm">
      {songs?.map((song, index) => (
        <div
          key={song.id}
          className={`flex items-center justify-between my-4 px-4 py-2 hover:bg-zinc-800 rounded transition ${
            currentSong?.id === song?.id ? "bg-zinc-800" : ""
          }`}
        >
          {/* Left: Index or playing icon + song info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-6 h-6 text-center shrink-0 relative group">
              {currentSong?.id === song?.id ? (
                <div className="relative">
                  <ScaleLoader
                    color={"green"}
                    loading={true}
                    height={12}
                    radius={20}
                    width={2}
                    barCount={4}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                  <button className="absolute inset-0 m-auto hidden group-hover:flex items-center justify-center">
                    <Pause size={20} className="text-green" />
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentSong(song)}
                    className="absolute inset-0 m-auto hidden group-hover:flex items-center justify-center"
                  >
                    <PlayCircle size={20} className="text-green-500" />
                  </button>
                  <span className="group-hover:hidden">{index + 1}</span>
                </>
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-semibold hover:underline cursor-pointer">
                {song.title}
              </span>
              <span className="text-xs text-zinc-400">{song?.artist}</span>
            </div>
          </div>

          {/* Right: Explicit, plus, duration, options */}
          <div className="flex items-center gap-4 text-zinc-400 shrink-0">
            <span>{formatTime(song?.duration)}</span>
            {fetchDeleteFavoriteSong ? (
              <Tippy content="Xóa khỏi danh sách">
                <button
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={() => fetchDeleteFavoriteSong(song.id)}
                >
                  <Trash size={16} className="cursor-pointer" />
                </button>
              </Tippy>
            ) : (
              <button
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => fetchDeleteSongFromAlbum(song.id)}
              >
                <Trash size={16} className="cursor-pointer" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
