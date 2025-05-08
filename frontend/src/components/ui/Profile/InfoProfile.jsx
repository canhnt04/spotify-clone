import React from "react";

const InfoProfile = ({ info, isAlbum }) => {
  const getImageSrc = () => {
    if (info?.thumbnail_url) return info.thumbnail_url;
    if (info?.avatar && info.avatar !== "null") return info.avatar;
    return undefined;
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
          {info?.full_name || info?.name}
        </h1>
        {!isAlbum && (
          <span className="mx-2 text-sm font-bold hover:underline cursor-pointer">
            1 album
          </span>
        )}
      </div>
    </div>
  );
};

export default InfoProfile;
