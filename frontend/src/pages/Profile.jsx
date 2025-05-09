import { useContext, useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import defaultAvatar from "../assets/images/default_avatar.jpg";
import { CopyIcon, Edit, Ellipsis, MessageCircle, Pencil } from "lucide-react";

import { StoreContext } from "../contexts/StoreProvider";

// Import Swiper styles
import Card from "../components/ui/Card/Card";
import Swipper from "../components/ui/Swipper/Swipper";
import { getMyListSong } from "../apis/songService";
import MyModal from "../components/ui/MyModal/MyModal";
import UpdateProfileForm from "../components/form/UpdateProfileForm";
import InfoProfile from "../components/ui/Profile/InfoProfile";
import Navbar from "../components/ui/Profile/Navbar";
const Profile = ({ data }) => {
  const [songs, setSongs] = useState([]);

  const { userInfo, currentSong, favoriteSongs } = useContext(StoreContext);

  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    const getMyListSongs = async () => {
      try {
        // Gọi api từ songService
        const res = await getMyListSong();
        if (res?.data && res?.data.data) {
          setSongs(res.data.data);
          console.log("Danh sách bài hát của tôi:", res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyListSongs();
  }, []);

  return (
    <div className="w-full px-10 mt-10">
      {/* HEADER */}
      <InfoProfile info={userInfo} />
      {/* CONTAINER */}
      <div className="my-10">
        {/* Navbar */}
        <Navbar info={userInfo} setVisibleModal={setVisibleModal} />
        {/* Song/> */}
        <Swipper
          data={songs}
          itemPerPage={currentSong ? 3 : 5}
          showNavigation={true}
          title={"Đã tải lên"}
        >
          {(item) => <Card data={item} />}
        </Swipper>
        {/* Favorite song */}
        <Swipper
          data={favoriteSongs}
          itemPerPage={currentSong ? 3 : 5}
          showNavigation={true}
          title={"Bài hát yêu thích"}
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

export default Profile;
