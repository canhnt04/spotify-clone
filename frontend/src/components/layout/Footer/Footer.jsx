import { useRef, useState, useEffect, useContext } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Volume2,
  ListMusic,
  Maximize2,
  Mic2,
  LayoutList,
} from "lucide-react";
import { StoreContext } from "../../../contexts/StoreProvider";
import Button from "../../ui/Button/Button";
import Song from "../../ui/Song/Song";

const Footer = () => {
  const { userInfo, currentSong } = useContext(StoreContext);

  if (!currentSong && userInfo) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white h-[80px] p-4 flex items-center justify-center shadow-md">
        <span className="text-sm font-bold">
          Lựa chọn một bài hát bất kì để phát
        </span>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="fixed bottom-0 left-0 right-0">
        <div className="px-4 py-2 mx-5 my-2 rounded-lg bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 text-white h-[80px] flex items-center justify-between shadow-md">
          <h1 className="text-md font-bold">
            Đăng ký để có thể nghe các bài hát không bị giới hạn.
          </h1>
          <Button to={"/signin"}>Đăng ký miễn phí</Button>
        </div>
      </div>
    );
  }

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    setIsPlaying(false);
    const update = () => setCurrentTime(audio.currentTime);
    const loaded = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", loaded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", loaded);
    };
  }, [currentSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black text-white h-[80px] p-4 flex items-center justify-between shadow-md">
      {/* Left */}
      <Song
        className={"flex items-center gap-3 w-1/3 min-w-0"}
        data={currentSong}
        isFooter
      />

      {/* Center */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-4 mb-1">
          <SkipBack size={18} className="cursor-pointer" />
          <button
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <SkipForward size={18} className="cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={currentTime}
            onChange={(e) => {
              const t = parseFloat(e.target.value);
              audioRef.current.currentTime = t;
              setCurrentTime(t);
            }}
            className="w-full h-1 bg-gray-700 accent-white rounded-lg cursor-pointer"
          />
          <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 w-1/3 justify-end">
        <Volume2 size={16} className="text-gray-400" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            audioRef.current.volume = v;
          }}
          className="w-20 h-1 bg-gray-700 accent-white rounded-lg cursor-pointer"
        />
        <LayoutList size={16} className="text-gray-400" />
        <ListMusic size={16} className="text-gray-400" />
        <Maximize2 size={16} className="text-gray-400" />
      </div>

      <audio ref={audioRef} src={currentSong.audio_url} />
    </footer>
  );
};

export default Footer;
