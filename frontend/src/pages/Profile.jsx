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
import { useParams } from "react-router-dom";
import { getInfoProfile } from "../apis/authService";
const Profile = ({ data }) => {
  const { id } = useParams();
  const [visibleModal, setVisibleModal] = useState(false);
  const [songs, setSongs] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);

  const { userInfo, currentSong, favoriteSongs } = useContext(StoreContext);

  const isMyProfile = userInfo?.id === id;

  useEffect(() => {
    const getMyListSongs = async () => {
      try {
        // Gọi api từ songService
        const res = await getMyListSong(id);
        if (res?.data && res?.data.data) {
          setSongs(res.data.data);
          console.log("Danh sách bài hát của tôi:", res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchInfoProfile = async () => {
      try {
        if (isMyProfile) {
          setProfileInfo(userInfo);
          return;
        }
        const res = await getInfoProfile(id);
        if (res.data) {
          setProfileInfo(res.data.user);
          console.log(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMyListSongs();
    fetchInfoProfile();
  }, [id]);

  return (
    <div className="w-full px-10 mt-10">
      {/* HEADER */}
      <InfoProfile isMyProfile={isMyProfile} info={profileInfo} />
      {/* CONTAINER */}
      <div className="my-10">
        {/* Navbar */}
        <Navbar
          isMyProfile={isMyProfile}
          info={userInfo}
          setVisibleModal={setVisibleModal}
        />
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
        {isMyProfile && (
          <Swipper
            data={favoriteSongs}
            itemPerPage={currentSong ? 3 : 5}
            showNavigation={true}
            title={"Bài hát yêu thích"}
          >
            {(item) => <Card data={item} />}
          </Swipper>
        )}
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
