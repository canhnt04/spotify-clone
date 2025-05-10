import React, { useContext, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import logo from "../../../assets/images/logo.jpg";
import avatar from "../../../assets/images/default_avatar.jpg";
import {
  Download,
  Home,
  LogOut,
  MessageSquareWarning,
  MessagesSquare,
  Music4,
  Navigation,
  Send,
  SquareArrowOutUpRight,
} from "lucide-react";
import Search from "../../ui/Search/Search";
import Button from "../../ui/Button/Button";

import { Link } from "react-router-dom";
import Dropdown from "../../ui/Dropdown/Dropdown";
import MenuItem from "../../ui/Dropdown/MenuItem";
import { StoreContext } from "../../../contexts/StoreProvider";
const Header = () => {
  const [visible, setVisible] = useState(false);
  const { userInfo } = useContext(StoreContext);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    window.location.reload();
  };
  return (
    <header className="fixed top-0 left-0 right-0  bg-black text-white h-[64px] px-4 py-2 flex items-center justify-between shadow-md">
      {/* Left: Logo + Home + Search */}
      <div className="flex items-center gap-4 h-full">
        <a
          href="https://localhost:5173/"
          className="h-full w-[48px] flex items-center justify-center rounded-full"
        >
          <img src={logo} alt="Spotify" className="w-8 h-8 rounded-full" />
        </a>

        <Link
          to={"/"}
          className="h-full w-[48px] flex items-center justify-center rounded-full bg-[#1f1f1f]"
        >
          <Music4 strokeWidth={1.5} absoluteStrokeWidth />
        </Link>

        <Search strokeWidth={1} />
      </div>

      {/* Right: Menu */}
      <div className="flex items-center gap-6 text-sm font-semibold">
        <nav className="flex items-center gap-4 text-gray-300">
          <a href="#" className="hover:text-white flex items-center gap-1">
            <Download size={14} /> Cài đặt Ứng dụng
          </a>
          {userInfo ? (
            <>
              <Link
                to={"/"}
                className="h-full w-[48px] px-2 py-[11px] flex items-center justify-center rounded-full bg-[#1f1f1f] hover:scale-103"
              >
                <MessagesSquare strokeWidth={1.5} size={24} />
              </Link>

              <Tippy
                interactive
                appendTo={() => document.body}
                visible={visible}
                onClickOutside={() => setVisible(false)}
                offset={[-100, 12]}
                render={(attrs) => (
                  <Dropdown>
                    <MenuItem
                      onClick={() => setVisible(false)}
                      header
                      to={`/profile/${userInfo?.id}`}
                      title={"Hồ sơ"}
                      icon={<SquareArrowOutUpRight size={18} />}
                    />

                    <MenuItem
                      header
                      title={"Góp ý kiến"}
                      icon={<MessageSquareWarning size={18} />}
                    />
                    <MenuItem
                      header
                      onClick={handleLogout}
                      title={"Đăng xuất"}
                      icon={<LogOut size={18} />}
                    />
                  </Dropdown>
                )}
              >
                <div
                  onClick={() => setVisible(!visible)}
                  className="h-[48px] w-[48px] overflow-hidden p-1 flex items-center justify-center rounded-full bg-[#1f1f1f] hover:scale-103 cursor-pointer"
                >
                  <img
                    src={userInfo.avatar !== null ? userInfo.avatar : avatar}
                    alt="avatar"
                    className="w-full h-full rounded-full object-center"
                  />
                </div>
              </Tippy>
            </>
          ) : (
            <>
              <Link to="/signin" className="hover:text-white">
                Đăng ký
              </Link>

              <Button to={"/login"}>Đăng nhập</Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
