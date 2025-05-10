import { useContext, useEffect, useState } from "react";
import InfoProfile from "../components/ui/Profile/InfoProfile";
import { useParams } from "react-router-dom";
import { getDetailAlbum } from "../apis/albumService";
import {
  Play,
  Plus,
  MoreHorizontal,
  Trash,
  Ellipsis,
  Pencil,
  Share,
  Link,
  Library,
} from "lucide-react";
import SongList from "../components/ui/List/SongList";
import { getSongById } from "../apis/songService";
import Navbar from "../components/ui/Profile/Navbar";
import Tippy from "@tippyjs/react/headless";
import Dropdown from "../components/ui/Dropdown/Dropdown";
import MenuItem from "../components/ui/Dropdown/MenuItem";
import { StoreContext } from "../contexts/StoreProvider";
import Button from "../components/ui/Button/Button";
import {
  addAlbumToLibrary,
  deleteAlbumToLibrary,
} from "../apis/libraryService";
import { ToastContext } from "../contexts/ToastContext";

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const { userInfo, library, fetchMyLibrary } = useContext(StoreContext);
  const { toast } = useContext(ToastContext);

  const isInLibrary = library?.albums?.find((item) => item.id === id);

  const handAddItemToLibrary = async () => {
    try {
      const res = await addAlbumToLibrary(id);
      if (res.data && res.status == 201) {
        toast.success(res.data.message);

        try {
          await fetchMyLibrary(); // Nếu lỗi ở đây, toast vẫn hiển thị
        } catch (fetchError) {
          console.error("Failed to fetch library:", fetchError);
        }
      }
    } catch (error) {
      toast.error(error?.message || "Lỗi thêm album vào thư viện");
    }
  };

  const handleAlbumToLibrary = async () => {
    try {
      const res = await deleteAlbumToLibrary(id);
      if (res.data && res.status == 200) {
        toast.success(res.data.message);
        try {
          await fetchMyLibrary(); // Cập nhật lại UI component thư viện
        } catch (fetchError) {
          console.error("Failed to fetch library:", fetchError);
        }
      }
    } catch (error) {
      toast.error(error?.message || "Lỗi xóa album khỏi thư viện");
    }
  };

  useEffect(() => {
    const fetchDetailAlbum = async () => {
      try {
        const res = await getDetailAlbum(id);
        if (res.data && res.status === 200) {
          const albumData = res.data.album;
          setAlbum(albumData);

          const songPromises = albumData.songs.map((songId) =>
            getSongById(songId)
          );
          const songResponses = await Promise.all(songPromises);

          const tmpSongs = songResponses
            .filter((res) => res.data && res.status === 200)
            .map((res) => res.data.data);

          setSongs(tmpSongs);
        }
      } catch (error) {
        console.error("error :", error);
      }
    };

    fetchDetailAlbum();
  }, [id]);

  return (
    <div>
      {/* Infomation album */}
      <InfoProfile info={album} isAlbum />

      {/* Navbar */}
      <div className="profile_action mx-2 mt-10 flex items-center gap-4">
        {!isInLibrary ? (
          <Button
            onClick={handAddItemToLibrary}
            themes="bg-transparent"
            className={"border border-white text-white hover:bg-transparent"}
          >
            Thêm vào thư viện
          </Button>
        ) : (
          <Button
            onClick={handleAlbumToLibrary}
            themes="bg-transparent"
            className={"border border-white text-white hover:bg-transparent"}
          >
            Xóa khỏi thư viện
          </Button>
        )}

        <Tippy
          placement="bottom-start"
          interactive
          visible={visible}
          onClickOutside={() => setVisible(false)}
          render={(attrs) => (
            <Dropdown tabIndex="-1" {...attrs}>
              {album?.creator === userInfo?.id ? (
                <>
                  <MenuItem
                    onClick={() => {
                      setVisibleModal(true);
                      setVisible(false);
                    }}
                    title={"Thêm bài hát"}
                    icon={<Plus size={18} />}
                  />

                  <MenuItem
                    onClick={() => {}}
                    title={"Cập nhật thông tin"}
                    icon={<Pencil size={18} />}
                  />

                  <MenuItem
                    onClick={() => {}}
                    title={"Xóa album"}
                    icon={<Trash size={18} />}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {
                      setVisibleModal(true);
                      setVisible(false);
                    }}
                    title={"Copy URL album"}
                    icon={<Link size={18} />}
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

      {/* Song list of album */}
      <SongList songs={songs} />
    </div>
  );
};

export default AlbumDetail;
