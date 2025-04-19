import React from "react";
import Card from "../Card/Card";

const List = ({ data, title, ...props }) => {
  return (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="text-sm underline font-medium">Hiện tất cả</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
        {data.map((song) => {
          return (
            <Card
              key={song.id}
              name={song.name}
              image={song.image}
              artistName={song.artistName}
              {...props}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
