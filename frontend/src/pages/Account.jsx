import { useContext, useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import defaultAvatar from "../assets/images/default_avatar.jpg";
import { CopyIcon, Edit, Ellipsis, MessageCircle, Pencil } from "lucide-react";

import { StoreContext } from "../contexts/StoreProvider";

// Import Swiper styles
import Card from "../components/ui/Card/Card";
import Swipper from "../components/ui/Swipper/Swipper";
import Button from "../components/ui/Button/Button";
import Dropdown from "../components/ui/Dropdown/Dropdown";
import MenuItem from "../components/ui/Dropdown/MenuItem";
import { getSongs } from "../apis/songService";
import MyModal from "../components/ui/MyModal/MyModal";
import UpdateProfileForm from "../components/form/UpdateProfileForm";
const Account = () => {
  const [songs, setSongs] = useState([]);

  const { userInfo } = useContext(StoreContext);

  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    const getListSongs = async () => {
      try {
        const res = await getSongs();
        if (res?.data && res?.data.data) {
          setSongs(res.data.data);
          console.log("Danh sách bài hát :", res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getListSongs();
  }, []);
  return (
    <div className="w-full px-10 mt-10">
      {/* HEADER */}
      <div className="header-accout_page flex items-center gap-10">
        <div className="image w-[232px] h-[232px] flex items-center justify-center rounded-full overflow-hidden">
          <img
            src={userInfo?.avatar ? userInfo.avatar : defaultAvatar}
            alt="avatar"
            className="w-full h-full object-center rounded-full"
          />
        </div>
        <div className="infomation flex flex-col gap-4">
          <h1 className="name-Accout text-9xl font-extrabold">
            {userInfo?.fullname}
          </h1>
          <span className="mx-2 text-sm font-bold hover:underline cursor-pointer">
            1 album
          </span>
        </div>
      </div>
      {/* CONTAINER */}
      <div className="my-10">
        <div className="profile_action mx-2 my-10 flex items-center gap-4">
          <Button to={"/chat"} className="message">
            <h1>Nhắn tin</h1>
          </Button>
          <Tippy
            placement="bottom-end"
            interactive
            visible={visible}
            onClickOutside={() => setVisible(false)}
            render={(attrs) => (
              <Dropdown tabIndex="-1" {...attrs}>
                <MenuItem
                  onClick={() => {
                    setVisibleModal(true);
                    setVisible(false);
                  }}
                  title={"Chỉnh sửa hồ sơ"}
                  icon={<Pencil size={18} />}
                />

                <MenuItem
                  title={"Sao chép URI"}
                  icon={<CopyIcon size={18} />}
                />
              </Dropdown>
            )}
          >
            <button
              onClick={() => setVisible(!visible)}
              className="option hover:scale-[1.1] cursor-pointer transition-all"
            >
              <Ellipsis size={40} />
            </button>
          </Tippy>
        </div>
        {/* <List data={songs} title={"Albums của bạn"} /> */}
        <Swipper
          data={songs}
          itemPerPage={6}
          showNavigation={true}
          title={"Được đề xuất cho hôm nay"}
        >
          {(item) => <Card data={item} />}
        </Swipper>
      </div>
      {/* Modal */}
      <MyModal
        open={visibleModal}
        setOpen={setVisibleModal}
        onClose={() => setVisibleModal(false)}
        isLoading
      >
        <UpdateProfileForm
          defaultAvatar={defaultAvatar}
          data={userInfo}
          setVisibleModal={setVisibleModal}
        />
      </MyModal>
    </div>
  );
};

export default Account;
