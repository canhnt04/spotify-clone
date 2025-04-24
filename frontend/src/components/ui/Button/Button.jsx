import React from "react";
import { Link } from "react-router-dom";
const Button = ({
  children,
  onClick,
  to,
  href,
  className,
  disible,
  themes = "bg-white",
  type,
}) => {
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
    <Comp
      {...props}
      className={`${themes} text-black text-center px-4 py-2 text-sm rounded-full font-bold hover:bg-gray-200 hover:scale-101 transition duration-300 ease-in-out cursor-pointer ${className}  ${
        disible ? "hidden" : ""
      }`}
    >
      {children}
    </Comp>
  );
};

export default Button;
