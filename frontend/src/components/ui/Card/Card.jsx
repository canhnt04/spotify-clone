import { Eye, Play } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";
import avatarDefault from "../../../assets/images/default_avatar.jpg";
import MyModal from "../MyModal/MyModal";
import Button from "../Button/Button";
import useLocalStorage from "../../hooks/useLocalStorage";
import useGetRecentSong from "../../hooks/useGetRecentSong";

const Card = ({ artistType, data }) => {
  const { userInfo, setCurrentSong } = useContext(StoreContext);
  const [recentSong, setResentSong] = useState(null);
  const [visible, setVisible] = useState(false);
  const { id, avatar, title, full_name, artist, thumbnail_url } = data || {};

  const handPlaySong = () => {
    if (!userInfo) {
      setVisible(true);
      return;
    }
    setCurrentSong(data);
  };
  return (
    <div
      key={id}
      className="bg-[#181818] p-2 rounded hover:bg-[#282828] transition"
    >
      {/* Xử lý thông báo nếu người dùng chưa đăng nhập mà phát nhạc */}
      <MyModal
        open={visible}
        setOpen={() => setVisible(false)}
        onClose={() => setVisible(false)}
      >
        <div className="lg:flex lg:w-full w-max bg-gradient-to-b from-[#1a2a3c] to-[#1a1a1a] rounded-xl p-10">
          {/* thumbnail_url */}
          <div className="w-1/2 mx-auto p-2 rounded-xl overflow-hidden">
            <img
              src={data?.thumbnail_url}
              alt="thumbnail_url"
              className="w-full h-full rounded-xl"
            />
          </div>
          {/* content */}
          <div className="flex flex-col gap-4 mt-14 p-4">
            <h2 className="text-2xl font-bold text-center">
              Bắt đầu nghe bằng tài khoản Spotify Free
            </h2>
            <Button
              themes="bg-[#1ed760]"
              to={"/signin"}
              className={"w-1/2 mx-auto hover:scale-1.1"}
            >
              Đăng ký miễn phí
            </Button>
            <Button
              to={"/login"}
              themes="bg-transparent"
              className={
                "w-1/2 mx-auto border border-white text-white hover:bg-transparent"
              }
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      </MyModal>
      <div className="relative w-full group">
        <img
          src={
            avatar || thumbnail_url ? avatar || thumbnail_url : avatarDefault
          }
          alt={title}
          className={`${
            artistType ? "rounded-full" : "rounded"
          } w-full aspect-square object-cover mb-2`}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handPlaySong}
            className="flex items-center justify-center w-10 h-10 bg-[#303030] hover:bg-[#404040] text-green-400 rounded-full cursor-pointer"
          >
            {!artistType ? <Play size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <h3 className="font-bold text-md truncate">{title || `${full_name}`}</h3>
      <p className="text-sm text-gray-400 truncate">{!artistType && artist}</p>
    </div>
  );
};

export default Card;
