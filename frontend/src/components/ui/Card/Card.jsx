import React from "react";

const Card = ({ id, image, name, artistName, artist }) => {
  return (
    <div
      key={id}
      className="bg-[#181818] p-2 rounded hover:bg-[#282828] transition"
    >
      <img
        src={image}
        alt={name}
        className={`${
          artist ? "rounded-full" : "rounded"
        } w-full aspect-square object-cover mb-2`}
      />

      <h3 className="font-semibold text-md truncate mb-2">{name}</h3>
      <p className="text-sm text-gray-400 truncate">{artistName}</p>
    </div>
  );
};

export default Card;
