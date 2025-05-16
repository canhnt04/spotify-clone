import { useContext, useEffect, useState } from "react";
import { useSong } from "../hooks/useSong";
import { StoreContext } from "../../contexts/StoreProvider";
import Button from "../ui/Button/Button";
import SimpleBar from "simplebar-react";
import { postSongToAlbum } from "../../apis/albumService";
import { ToastContext } from "../../contexts/ToastContext";
import { X } from "lucide-react";
import { getSongById } from "../../apis/songService";

const AddSongToAlbum = ({
  albumId,
  setVisibleModal,
  setSongsFromParentComponent,
  songsFromParentComponent,
}) => {
  const [songs, setSongs] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const { userInfo } = useContext(StoreContext);
  const { getListSong } = useSong();
  const { toast } = useContext(ToastContext);

  // Lấy danh sách bài hát của người dùng
  // và lọc ra những bài hát chưa có trong album
  const fetchListMySongNotEsxitInAlbum = async () => {
    const data = await getListSong(userInfo?.id);
    if (data) {
      const filteredSongs = data?.filter(
        (song) => !songsFromParentComponent?.some((item) => item.id === song.id)
      );
      setSongs(filteredSongs);
    }
  };

  // Hàm xử lý checkbox
  const handleCheckboxChange = (songId) => {
    setSelectedSongs(
      (prevSelected) =>
        prevSelected.includes(songId)
          ? prevSelected.filter((id) => id !== songId) // Bỏ chọn
          : [...prevSelected, songId] // Chọn thêm
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSongs.length === 0) {
      toast.error("Vui lòng chọn ít nhất một bài hát.");
      return;
    }

    try {
      await Promise.all(
        selectedSongs.map(
          async (songId) => await postSongToAlbum(albumId, songId)
        )
      );

      // Lấy chi tiết bài hát (sau khi đảm bảo đã thêm thành công)
      const songsTmp = await Promise.all(
        selectedSongs.map(async (songId) => {
          const res = await getSongById(songId);
          if (res.data && res.status === 200) {
            return res.data.data;
          } else {
            throw new Error("Lỗi khi lấy bài hát " + songId);
          }
        })
      );

      toast.success("Đã thêm tất cả bài hát vào album.");

      // Cập nhật lại danh sách bài hát trong album (component cha)
      setSongsFromParentComponent((prev) => [...prev, ...songsTmp]);

      setVisibleModal((prev) => ({ ...prev, visible: false }));
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchListMySongNotEsxitInAlbum();
  }, []);

  return (
    <form
      className="w-full my-4 px-6 py-4 text-sm bg-primary rounded-2xl"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between">
        <h1 className="mb-2 font-bold text-xl">Lựa chọn bài hát</h1>
        <button>
          <X
            size={20}
            onClick={() =>
              setVisibleModal((prev) => ({ ...prev, visible: false }))
            }
          />
        </button>
      </div>
      <SimpleBar
        style={{
          maxHeight: 300,
          height: "max-content",
          paddingRight: "20px",
        }}
      >
        {songs?.map((song) => (
          <div
            key={song.id}
            className="flex items-center justify-between my-2 px-4 py-2 hover:bg-zinc-800 rounded transition bg-zinc-800"
          >
            <div className="flex items-center gap-4 flex-1">
              <img
                width="30"
                src={song?.thumbnail_url}
                alt="thumbnail_url"
                className="rounded"
              />
              <div className="flex flex-col">
                <span className="font-semibold hover:underline cursor-pointer">
                  {song.title}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={selectedSongs.includes(song.id)}
              onChange={() => handleCheckboxChange(song.id)}
              className="accent-green-500"
            />
          </div>
        ))}
      </SimpleBar>
      <div className="flex justify-center">
        <Button className={"w-1/2 my-4"}>THÊM BÀI HÁT ĐÃ CHỌN VÀO ALBUM</Button>
      </div>
    </form>
  );
};

export default AddSongToAlbum;
