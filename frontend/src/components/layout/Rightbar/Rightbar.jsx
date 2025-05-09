import Button from "../../ui/Button/Button";
import { HeartPlus, HeartPulse, ListMusic, Plus, Upload } from "lucide-react";
import Song from "../../ui/Song/Song";
import Tippy from "@tippyjs/react/headless";
import Dropdown from "../../ui/Dropdown/Dropdown";
import MenuItem from "../../ui/Dropdown/MenuItem";
import MyModal from "../../ui/MyModal/MyModal";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";
import { getSongs } from "../../../apis/songService";
import SimpleBar from "simplebar-react";

const Rightbar = () => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

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

  useEffect(() => {
    console.log("Current song: ", currentSong);
    getSongNextPlay();
  }, []);
  return (
    <>
      {currentSong && (
        <div className="w-[353px] bg-[#121212] rounded-2xl">
          <SimpleBar
            style={{
              maxHeight: 550,
              height: "max-content",
              padding: "32px 16px",
            }}
          >
            <div className="w-full group mb-2">
              <img
                src={currentSong.thumbnail_url}
                className="w-full aspect-square object-cover mb-2 rounded-sm"
              />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-extrabold">
                    {currentSong.title}
                  </span>
                  <p className="text-sm font-bold">{currentSong.artist}</p>
                </div>
                <HeartPlus size={20} />
              </div>
            </div>
            <h2 className="mt-4 text-xl font-bold">Danh sách chờ</h2>
            <div className="rounded-lg mt-4 flex flex-col h-[calc(100vh-150px)] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
              {playList.length > 0 &&
                playList.map((song) => <Song key={song.id} data={song} />)}
            </div>
          </SimpleBar>
        </div>
      )}
    </>
  );
};

export default Rightbar;
