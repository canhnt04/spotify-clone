import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import logo from "../../../assets/images/logo.jpg";
import avatar from "../../../assets/images/default_avatar.jpg";
import {
  Download,
  Home,
  LogOut,
  Send,
  SquareArrowOutUpRight,
} from "lucide-react";
import Search from "../../ui/Search/Search";
import Button from "../../ui/Button/Button";

import { Link } from "react-router-dom";
import Dropdown from "../../ui/Dropdown/Dropdown";
import MenuItem from "../../ui/Dropdown/MenuItem";
const Header = () => {
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };
  const isLogin = localStorage.getItem("authToken") ? true : false;
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
          <Home size={30} />
        </Link>

        <Search />
      </div>

      {/* Right: Menu */}
      <div className="flex items-center gap-6 text-sm font-semibold">
        <nav className="flex items-center gap-4 text-gray-300">
          <a href="#" className="hover:text-white flex items-center gap-1">
            <Download size={14} /> Cài đặt Ứng dụng
          </a>
          {isLogin ? (
            <>
              <Link
                to={"/"}
                className="h-full w-[48px] px-2 py-[11px] flex items-center justify-center rounded-full bg-[#1f1f1f] hover:scale-103"
              >
                <Send size={24} />
              </Link>

              <Tippy
                interactive
                visible={visible}
                onClickOutside={() => setVisible(false)}
                offset={[-100, 12]}
                render={(attrs) => (
                  <Dropdown tabIndex="-1" {...attrs}>
                    <MenuItem
                      header
                      to={"/account"}
                      title={"Tài khoản"}
                      icon={<SquareArrowOutUpRight size={18} />}
                    />

                    <MenuItem
                      header
                      title={"Góp ý kiến"}
                      icon={<SquareArrowOutUpRight size={18} />}
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
                  className="h-full w-[48px] p-2 flex items-center justify-center rounded-full bg-[#1f1f1f] hover:scale-103 cursor-pointer"
                >
                  <img
                    src={avatar}
                    alt="avatar"
                    className="w-full h-full rounded-full"
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
