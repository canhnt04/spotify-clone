import { useContext } from "react";
import { StoreContext } from "../../../contexts/StoreProvider";
import favoriteImage from "../../../assets/images/favorite_song.jpg";
const InfoProfile = ({ info, isAlbum }) => {
  const { defaulAvatar } = useContext(StoreContext);
  const getImageSrc = () => {
    if (info?.thumbnail_url) return info.thumbnail_url;
    if (info?.avatar) return info.avatar;
    if (isAlbum) return favoriteImage;
    return defaulAvatar;
  };
  return (
    <div className="header-accout_page flex items-center gap-10">
      <div
        className={`image w-[232px] h-[232px] shrink-0 flex items-center justify-center overflow-hidden ${
          isAlbum ? "rounded-xl" : "rounded-full"
        }`}
      >
        <img
          src={getImageSrc()}
          alt="avatar"
          className="w-full h-full object-center"
        />
      </div>
      <div className="infomation flex flex-col gap-4">
        <h1 className="font-extrabold text-7xl">
          {info?.full_name || info?.name || "Bài hát yêu thích"}
        </h1>
        {isAlbum && (
          <span className="mx-2 text-sm font-bold hover:underline cursor-pointer">
            {isAlbum.count} {" bài hát"}
          </span>
        )}
      </div>
    </div>
  );
};

export default InfoProfile;
