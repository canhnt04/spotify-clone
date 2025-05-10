import { useContext, useState } from "react";

import Tippy from "@tippyjs/react/headless";
import { useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { CopyIcon, Ellipsis, Pencil, Plus } from "lucide-react";
import Button from "../Button/Button";
import MenuItem from "../Dropdown/MenuItem";
import { StoreContext } from "../../../contexts/StoreProvider";
import { useParams } from "react-router-dom";
import {
  addUserToLibrary,
  deleteUserToLibrary,
} from "../../../apis/libraryService";
import { ToastContext } from "../../../contexts/ToastContext";

const Navbar = ({ info, isMyProfile, setVisibleModal }) => {
  const [visible, setVisible] = useState();
  const [isExsitsLibrary, setIsExsitsLibrary] = useState(null);
  const { id } = useParams();
  const { library, fetchMyLibrary } = useContext(StoreContext);
  const isExsits = library?.users?.find((item) => item.id == id);

  const fetchFollowUser = async () => {
    console.log("fetchFollowUser called");
    try {
      const res = await addUserToLibrary(id);
      if (res.data && res.status == 201) {
        await fetchMyLibrary();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUnFollowUser = async () => {
    console.log("fetchUnFollowUser called");
    try {
      const res = await deleteUserToLibrary(id);
      if (res.data && res.status == 201) {
        await fetchMyLibrary();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Component navbar user re-render");
    setIsExsitsLibrary(isExsits);
  }, [library]);

  return (
    <div className="profile_action mx-2 my-10 flex items-center gap-4">
      {!isMyProfile && (
        <Button
          to={"/chat"}
          themes="bg-transparent"
          className={"border border-white text-white hover:bg-transparent"}
        >
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
            {isMyProfile ? (
              <>
                <MenuItem
                  onClick={() => {
                    setVisibleModal(true);
                    setVisible(false);
                  }}
                  title={"Cập nhật thông tin"}
                  icon={<Pencil size={18} />}
                />
                <MenuItem
                  onClick={() => {}}
                  title={"Copy URL profile"}
                  icon={<CopyIcon size={18} />}
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    !isExsitsLibrary ? fetchFollowUser() : fetchUnFollowUser();
                  }}
                  title={!isExsitsLibrary ? "Theo dõi" : "Bỏ theo dõi"}
                  icon={<Plus size={18} />}
                />
                <MenuItem
                  onClick={() => {}}
                  title={"Copy URL profile"}
                  icon={<CopyIcon size={18} />}
                />
              </>
            )}
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
