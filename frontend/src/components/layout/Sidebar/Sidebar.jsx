import Button from "../../ui/Button/Button";
import { HeartPulse, ListMusic, Plus, Upload } from "lucide-react";
import Song from "../../ui/Song/Song";
import Tippy from "@tippyjs/react/headless";
import Dropdown from "../../ui/Dropdown/Dropdown";
import MenuItem from "../../ui/Dropdown/MenuItem";
import { useEffect, useState } from "react";
const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const isLogin = localStorage.getItem("authToken") ? true : false;
  useEffect(() => {
    console.log("visible", visible);
  });
  return (
    <div className="w-[353px] bg-[#121212] p-4 rounded-2xl">
      <div className="h-[40px] flex items-center justify-between">
        <h2 className="text-lg font-bold">Thư viện</h2>

        <Tippy
          visible={visible}
          offset={[80, 10]}
          content="Hello"
          interactive
          onClickOutside={() => setVisible(false)}
          render={(attrs) => (
            <Dropdown>
              <MenuItem title={"Tạo album"} icon={<ListMusic size={24} />} />
              <MenuItem title={"Upload bài hát"} icon={<Upload size={24} />} />
              <MenuItem
                title={"Bài hát yêu thích"}
                icon={<HeartPulse size={24} />}
              />
            </Dropdown>
          )}
        >
          <div>
            <Button
              onClick={() => setVisible(!visible)}
              themes={"bg-[#1f1f1f]"}
              className={"flex items-center text-white hover:text-black "}
            >
              <Plus size={16} />
              <span className="text-md font-bold ml-1">Tạo</span>
            </Button>
          </div>
        </Tippy>
      </div>

      {isLogin ? (
        <>
          <div className="rounded-lg mt-4 flex flex-col h-[calc(100vh-150px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
            <Song />
          </div>
        </>
      ) : (
        <>
          <div className="bg-[#242424] rounded-lg p-4 mt-4 ">
            <h3 className="font-bold text-white text-sm mb-1">
              Tải video âm nhạc đầu tiên của bạn
            </h3>
            <p className="text-xs text-gray-400 mb-2 font-bold">
              Rất dễ! Chúng tôi sẽ giúp bạn
            </p>
            <Button className="mt-2">Tải video âm nhạc</Button>
          </div>
          <div className="bg-[#242424] rounded-lg p-4 mt-4 ">
            <h3 className="font-bold text-white text-sm mb-1">
              Hãy cùng tìm và lắng nghe một số album
            </h3>
            <p className="text-xs text-gray-400 mb-2 font-bold">
              Chúng tôi sẽ đề xuất một số album nổi bật cho bạn
            </p>
            <Button className="mt-2">Xem danh sách album</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
