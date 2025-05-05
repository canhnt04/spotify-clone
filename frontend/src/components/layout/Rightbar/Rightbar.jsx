import Button from "../../ui/Button/Button";
import { HeartPlus, HeartPulse, ListMusic, Plus, Upload } from "lucide-react";
import Song from "../../ui/Song/Song";
import Tippy from "@tippyjs/react/headless";
import Dropdown from "../../ui/Dropdown/Dropdown";
import MenuItem from "../../ui/Dropdown/MenuItem";
import MyModal from "../../ui/MyModal/MyModal";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";

const Rightbar = () => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const { currentSong } = useContext(StoreContext);
  useEffect(() => {
    console.log("Current song: ", currentSong);
  });
  return (
    <>
      {currentSong && (
        <div className="w-[353px] bg-[#121212] p-4 rounded-2xl overflow-y-auto">
          <div className="w-full group my-2">
            <img
              src={currentSong.thumbnail_url}
              className="w-full aspect-square object-cover mb-2 rounded-xl"
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
          <h2 className="mt-4 text-xl font-bold">Danh sách phát</h2>
          <div className="rounded-lg mt-4 flex flex-col h-[calc(100vh-150px)] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
          </div>
        </div>
      )}
    </>
  );
};

export default Rightbar;
