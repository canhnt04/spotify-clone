import { motion, AnimatePresence } from "framer-motion";
import Song from "../../ui/Song/Song";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";
import { getSongs } from "../../../apis/songService";
import SimpleBar from "simplebar-react";

const Rightbar = () => {
  const { currentSong, playList, setPlayList } = useContext(StoreContext);

  const getSongNextPlay = async () => {
    try {
      const res = await getSongs();
      if (res?.data && res?.data.data) {
        const songs = res.data.data;

        songs?.map((song) => playList?.push(song));

        setPlayList(playList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const motionObj = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4 },
  };

  useEffect(() => {
    console.log("Current song: ", currentSong);
    getSongNextPlay();
  }, [currentSong]);
  return (
    <AnimatePresence>
      {currentSong && (
        <div className="w-[300px] bg-[#121212] rounded-2xl">
          <SimpleBar
            style={{
              maxHeight: 550,
              height: "max-content",
              padding: "32px 16px",
            }}
          >
            <motion.div {...motionObj} className="w-full group mb-2">
              <img
                src={currentSong.thumbnail_url}
                className="w-full aspect-square object-contain mb-2 rounded-sm"
              />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-extrabold">
                    {currentSong.title}
                  </span>
                  <p className="text-xs font-bold">{currentSong.artist}</p>
                </div>
              </div>
            </motion.div>
            <h2 className="mt-4 text-xl font-bold">Danh sách chờ</h2>
            <motion.div
              {...motionObj}
              className="rounded-lg mt-4 flex flex-col h-[calc(100vh-150px)] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
            >
              {playList.length > 0 &&
                playList.map((song) => <Song key={song.id} data={song} />)}
            </motion.div>
          </SimpleBar>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Rightbar;
