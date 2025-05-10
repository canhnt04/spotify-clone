import { useContext, useEffect, useState } from "react";
import InfoProfile from "../components/ui/Profile/InfoProfile";
import SongList from "../components/ui/List/SongList";
import { StoreContext } from "../contexts/StoreProvider";
import { deleteFavoriteSong } from "../apis/songService";
import { ToastContext } from "../contexts/ToastContext";
import { Music4 } from "lucide-react";
import Button from "../components/ui/Button/Button";

const FavoriteSong = () => {
  const { favoriteSongs, fetchFavoriteSongs } = useContext(StoreContext);
  const { toast } = useContext(ToastContext);
  const fetchDeleteFavoriteSong = async (id) => {
    try {
      const res = await deleteFavoriteSong(id);
      if (res.data || res.status == 200) {
        await fetchFavoriteSongs();
        toast.success("Đã xóa khỏi Bài hát yêu thích");
      }
    } catch (error) {
      toast.error(res.data.message);
    }
  };
  return (
    <div>
      {/* Thông tin danh sách bài hát yêu thích */}
      <InfoProfile isAlbum={{ count: favoriteSongs?.length }} />

      {/* Danh sách các bài hát có trong bài hát yêu thích */}
      <SongList
        songs={favoriteSongs || []}
        fetchDeleteFavoriteSong={fetchDeleteFavoriteSong}
      />
      {/* Nếu không có bài hát nào trong danh sách yêu thích */}
      {favoriteSongs?.length == 0 && (
        <div className="w-full flex flex-col items-center justify-center">
          <span>
            <Music4 size={100} strokeWidth={1} />
          </span>
          <span className="text-2xl font-bold my-4">
            Bài hát bạn yêu thích sẽ xuất hiện ở đây
          </span>
          <span className="text-sm font-medium ">
            Lưu bài hát bằng cách nhấn vào biểu tượng trái tim.
          </span>
          <Button className={"my-4 "}>Tìm bài hát</Button>
        </div>
      )}
    </div>
  );
};

export default FavoriteSong;
