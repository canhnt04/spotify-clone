import useLocalStorage from "./useLocalStorage";

const useGetRecentSong = (key = "recentSong") => {
  const [recentSong, setRecentSong] = useLocalStorage(key, {});

  const addTrack = (track) => {
    setList((prev) => {
      const updated = [track, ...prev.filter((t) => t.id !== track.id)];
      return updated.slice(0, limit);
    });
  };

  const clearHistory = () => setList([]);

  return {
    recentlyPlayed: recentSong,
    addToRecentlyPlayed: addTrack,
    clearRecentlyPlayed: clearHistory,
  };
};

export default useGetRecentSong;
