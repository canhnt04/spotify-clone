import React, { useRef, useState, useEffect } from "react";
import {
  Pause,
  Play,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
} from "lucide-react";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const MusicPlayer = (props) => {
  const {
    title = "Saint-Tropez",
    artist = "Post Malone",
    thumbnail_url = "https://i.imgur.com/M7pI0Zk.png",
    audio_url = "http://res.cloudinary.com/dsohleblh/raw/upload/v1745063097/draheaqzv9soqv890f89.mp3",
  } = props;

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div className="bg-[#202020] text-white h-max rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-2">Now Playing</h2>
      <img
        src={thumbnail_url}
        alt="Album art"
        className="w-40 h-40 rounded-xl object-cover mx-auto"
      />
      <div className="text-center mt-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-400">{artist}</p>
      </div>

      <audio ref={audioRef} src={audio_url} />

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          className="w-full mt-1 accent-white"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-4">
        <Shuffle className="text-gray-400 w-5 h-5" />
        <SkipBack className="w-6 h-6" />
        <button
          className="w-12 h-12 bg-[#303030] hover:bg-[#202020] rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer transition"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <SkipForward className="w-6 h-6" />
        <Repeat className="text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};

export default MusicPlayer;
