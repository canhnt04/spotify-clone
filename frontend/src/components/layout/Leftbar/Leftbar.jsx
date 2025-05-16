import Button from "../../ui/Button/Button";
import { HeartPulse, ListMusic, Plus, Upload } from "lucide-react";
import Song from "../../ui/Song/Song";
import Tippy from "@tippyjs/react/headless";
import Dropdown from "../../ui/Dropdown/Dropdown";
import MenuItem from "../../ui/Dropdown/MenuItem";
import MyModal from "../../ui/MyModal/MyModal";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";
import CreateAlbumForm from "../../form/CreateAlbumForm";
import LibraryItem from "../../ui/LibraryItem/LibraryItem";

import SimpleBar from "simplebar-react";
import { useNavigate } from "react-router-dom";
import UploadVideoSong from "../../form/UploadVideoSong";

const Leftbar = () => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState({
    visible: false,
    form: null,
  });
  const { userInfo, library, favoriteSongs } = useContext(StoreContext);

  useEffect(() => {
    console.log("Conponent leftbar re-render: ", library);
  }, [library]);

  return (
    <div className="w-[353px] bg-[#121212] py-4 rounded-2xl">
      <MyModal
        open={visibleModal.visible}
        setOpen={setVisibleModal}
        onClose={() => setVisibleModal(false)}
        isLoading
      >
        {visibleModal.form}
      </MyModal>
      <div className="h-[40px] flex items-center px-4 justify-between">
        <h2 className="text-lg font-bold">Thư viện</h2>

        <Tippy
          visible={visible}
          offset={[80, 10]}
          interactive
          onClickOutside={() => setVisible(false)}
          render={(attrs) => (
            <Dropdown>
              <MenuItem
                title={"Tạo album"}
                icon={
                  <ListMusic
                    size={24}
                    onClick={() => {
                      setVisibleModal({
                        visible: true,
                        form: (
                          <CreateAlbumForm setVisibleModal={setVisibleModal} />
                        ),
                      });
                      setVisible(false);
                    }}
                  />
                }
              />
              <MenuItem
                title={"Upload video"}
                icon={
                  <Upload
                    size={24}
                    onClick={() => {
                      setVisible(false);
                      setVisibleModal({
                        visible: true,
                        form: (
                          <UploadVideoSong setVisibleModal={setVisibleModal} />
                        ),
                      });
                    }}
                  />
                }
              />
              <MenuItem
                to={"/song/upload"}
                title={"Upload bài hát"}
                icon={<Upload size={24} />}
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

      {(userInfo && favoriteSongs?.length > 0) ||
      library?.users?.length > 0 ||
      library?.albums?.length > 0 ? (
        <SimpleBar
          style={{ maxHeight: 500, height: "max-content", padding: "0 20px" }}
        >
          <div className="rounded-lg mt-4 flex flex-col ">
            {favoriteSongs?.length > 0 && (
              <LibraryItem favorite={favoriteSongs} />
            )}

            {library.albums &&
              library.albums?.map((album) => (
                <LibraryItem key={album?.id} album={album} />
              ))}

            {library.users &&
              library.users?.map((user) => (
                <LibraryItem key={user?.id} user={user} />
              ))}
          </div>
        </SimpleBar>
      ) : (
        <div className="p-4">
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
        </div>
      )}
    </div>
  );
};

export default Leftbar;
