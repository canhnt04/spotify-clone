import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ title, icon, to, href, onClick, header }) => {
  let Comp = "button";
  const props = {
    onClick,
  };
  if (to) {
    Comp = Link;
    props.to = to;
  } else if (href) {
    Comp = "a";
    props.href = href;
  }
  return (
    <Comp {...props} onClick={onClick} className="max-w-full w-56">
      <div
        className={`flex items-center ${
          header ? "justify-between" : ""
        } px-4 py-2 hover:bg-[#2a2a2a] font-bold cursor-pointer rounded`}
      >
        {header ? (
          <>
            <span>{title}</span>
            {icon}
          </>
        ) : (
          <>
            <div className="h-full rounded-full">{icon}</div>
            <span className="ml-4">{title}</span>
          </>
        )}
      </div>
    </Comp>
  );
};

export default MenuItem;
