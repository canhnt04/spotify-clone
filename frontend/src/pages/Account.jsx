import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import defaultAvatar from "../assets/images/default_avatar.jpg";
import { CopyIcon, Ellipsis, MessageCircle, Pencil } from "lucide-react";

// Import Swiper styles
import Card from "../components/ui/Card/Card";
import Swipper from "../components/ui/Swipper/Swipper";
import Button from "../components/ui/Button/Button";
import Dropdown from "../components/ui/Dropdown/Dropdown";
import MenuItem from "../components/ui/Dropdown/MenuItem";
const Account = () => {
  const songs = [
    {
      id: 1,
      name: "Nước mắt cá sấu",
      artistName: "HIEUTHUHAI",
      image: "https://i.scdn.co/image/ab67616d00001e024594668d4629f899daba689a",
    },
    {
      id: 2,
      name: "Ôm em thật lâu",
      artistName: "MONO",
      image: "https://i.scdn.co/image/ab67616d00001e024a7655026a9e80a95afba515",
    },
    {
      id: 3,
      name: "Lễ đường",
      artistName: "Kai Đinh",
      image: "https://i.scdn.co/image/ab67616d00001e0210ccec5b14a7b1b5c552d5cc",
    },
    {
      id: 4,
      name: "Phép màu - Đàn cá",
      artistName: "MAYDAYs, Minh Tốc & Lam",
      image: "https://i.scdn.co/image/ab67616d00001e02c51258e41841d5b0365054e7",
    },

    {
      id: 5,
      name: "Azizam",
      artistName: "Ed Sheeran",
      image: "https://i.scdn.co/image/ab67616d00001e025aac795808fc6b6d229c363b",
    },
    {
      id: 6,
      name: "Đến đây bên anh",
      artistName: "Cloud 5, Dangrangto",
      image: "https://i.scdn.co/image/ab67616d00001e02c7d258d4ce12b05006b28f64",
    },
    {
      id: 4,
      name: "Phép màu - Đàn cá",
      artistName: "MAYDAYs, Minh Tốc & Lam",
      image: "https://i.scdn.co/image/ab67616d00001e02c51258e41841d5b0365054e7",
    },

    {
      id: 5,
      name: "Azizam",
      artistName: "Ed Sheeran",
      image: "https://i.scdn.co/image/ab67616d00001e025aac795808fc6b6d229c363b",
    },
    {
      id: 6,
      name: "Đến đây bên anh",
      artistName: "Cloud 5, Dangrangto",
      image: "https://i.scdn.co/image/ab67616d00001e02c7d258d4ce12b05006b28f64",
    },
    {
      id: 4,
      name: "Phép màu - Đàn cá",
      artistName: "MAYDAYs, Minh Tốc & Lam",
      image: "https://i.scdn.co/image/ab67616d00001e02c51258e41841d5b0365054e7",
    },

    {
      id: 5,
      name: "Azizam",
      artistName: "Ed Sheeran",
      image: "https://i.scdn.co/image/ab67616d00001e025aac795808fc6b6d229c363b",
    },
    {
      id: 6,
      name: "Đến đây bên anh",
      artistName: "Cloud 5, Dangrangto",
      image: "https://i.scdn.co/image/ab67616d00001e02c7d258d4ce12b05006b28f64",
    },
  ];

  const [visible, setVisible] = useState(false);
  return (
    <div className="w-full px-10 mt-10">
      {/* HEADER */}
      <div className="header-accout_page flex items-center gap-10">
        <div className="image w-[232px] h-[232px] flex items-center justify-center rounded-full overflow-hidden">
          <img
            src={defaultAvatar}
            alt="avatar"
            className="w-full h-full object-center rounded-full"
          />
        </div>
        <div className="infomation flex flex-col gap-4">
          <h1 className="name-Accout text-9xl font-extrabold">Ronaldo</h1>
          <span className="mx-2 text-sm font-bold hover:underline cursor-pointer">
            1 album
          </span>
        </div>
      </div>
      {/* CONTAINER */}
      <div className="my-10">
        <div className="profile_action mx-2 my-10 flex items-center gap-4">
          <Button to={"/chat"} className="message">
            <h1>Nhắn tin</h1>
          </Button>
          <Tippy
            placement="bottom-end"
            interactive
            visible={visible}
            onClickOutside={() => setVisible(false)}
            render={(attrs) => (
              <Dropdown tabIndex="-1" {...attrs}>
                <MenuItem
                  to={"/"}
                  title={"Chỉnh sửa hồ sơ"}
                  icon={<Pencil size={18} />}
                />

                <MenuItem
                  title={"Sao chép URI"}
                  icon={<CopyIcon size={18} />}
                />
              </Dropdown>
            )}
          >
            <button
              onClick={() => setVisible(!visible)}
              className="option hover:scale-[1.1] cursor-pointer transition-all"
            >
              <Ellipsis size={40} />
            </button>
          </Tippy>
        </div>
        {/* <List data={songs} title={"Albums của bạn"} /> */}
        <Swipper data={songs} itemPerPage={6} showNavigation={true}>
          {(item) => (
            <Card
              id={item.id}
              image={item.image}
              name={item.name}
              artistName={item.artistName}
            />
          )}
        </Swipper>
      </div>
    </div>
  );
};

export default Account;
