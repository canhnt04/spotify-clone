import { useContext, useState } from "react";

import Tippy from "@tippyjs/react/headless";
import React, { useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { CopyIcon, Ellipsis, Pencil } from "lucide-react";
import Button from "../Button/Button";
import MenuItem from "../Dropdown/MenuItem";
import { StoreContext } from "../../../contexts/StoreProvider";

const Navbar = ({ info, setVisibleModal }) => {
  const [visible, setVisible] = useState();
  const { userInfo } = useContext(StoreContext);
  useEffect(() => console.log(visible), []);
  return (
    <div className="profile_action mx-2 my-10 flex items-center gap-4">
      {userInfo?.id !== info?.id && (
        <Button to={"/chat"} className="message">
          Nhắn tin
        </Button>
      )}
      <Tippy
        placement="bottom-end"
        interactive
        visible={visible}
        onClickOutside={() => setVisible(false)}
        render={(attrs) => (
          <Dropdown tabIndex="-1" {...attrs}>
            <MenuItem
              onClick={() => {
                setVisibleModal(true);
                setVisible(false);
              }}
              title={"Chỉnh sửa hồ sơ"}
              icon={<Pencil size={18} />}
            />

            <MenuItem title={"Sao chép URI"} icon={<CopyIcon size={18} />} />
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
  );
};

export default Navbar;
