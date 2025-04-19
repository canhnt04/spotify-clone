import React from "react";

const ArtistCard = () => {
  return (
    <div className="flex-shrink-0 w-24 text-center">
      <img
        src="https://placehold.co/100x100?text=Artist"
        alt="Artist"
        className="w-24 h-24 rounded-full mb-2"
      />
      <p className="text-sm">Tên nghệ sĩ</p>
    </div>
  );
};

export default ArtistCard;
