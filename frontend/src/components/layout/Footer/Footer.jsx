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
  Download,
} from "lucide-react";
import { StoreContext } from "../../../contexts/StoreProvider";
import Button from "../../ui/Button/Button";
import Song from "../../ui/Song/Song";
import formatTime from "../../../utils/formatTime";
import { addFavoriteSong } from "../../../apis/songService";
import { ToastContext } from "../../../contexts/ToastContext";
const Footer = () => {
  const { userInfo, currentSong, setCurrentSong, playList } =
    useContext(StoreContext);
  const { toast } = useContext(ToastContext);

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

    playSong();

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

  const playSong = () => {
    const audio = audioRef.current;
    audio.play();
    setIsPlaying(true);
  };

  const handleAddFavoriteSong = async () => {
    try {
      const res = await addFavoriteSong(currentSong?.id);
      if (res.data && res.data.favorite) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentSong.audio_url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `${currentSong.title || "song"}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Tải file thất bại:", error);
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black text-white h-[80px] p-4 flex items-center justify-between shadow-md">
      {/* Left */}
      <Song
        className={"flex items-center gap-3 w-1/3 min-w-0"}
        data={currentSong}
        isFooter
        onClickFooter={handleAddFavoriteSong}
      />

      {/* Center */}
      <div className="flex flex-col items-center w-1/3">
        <div className="flex items-center gap-4 mb-1">
          <button>
            <SkipBack size={18} className="cursor-pointer" />
          </button>
          <button
            className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button onClick={() => setCurrentSong(playList[0])}>
            <SkipForward size={18} className="cursor-pointer" />
          </button>
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
        <button onClick={handleDownload} className="hover:text-white">
          <Download size={16} className="text-gray-400" />
        </button>
      </div>

      <audio ref={audioRef} src={currentSong.audio_url} />
    </footer>
  );
};

export default Footer;
