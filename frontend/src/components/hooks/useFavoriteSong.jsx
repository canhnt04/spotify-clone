import { useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { addFavoriteSong, deleteFavoriteSong } from "../../apis/songService";
import { StoreContext } from "../../contexts/StoreProvider";

export const useFavoriteSong = () => {
  const { favoriteSongs, fetchFavoriteSongs } = useContext(StoreContext);

  // Kiểm tra xem bài hát đã tồn tại trong thư viện
  const checkIsExsitSongInLibrary = (songId) => {
    return favoriteSongs?.find((item) => item.id == songId);
  };

  // Thêm hoặc xóa bài hát yêu thích khỏi danh sách
  // bằng cách kiểm tra bài hát có tồn tại trong thư viện chưa
  const handleAddAndDeleteFavoriteSong = useCallback(async (id) => {
    const isExsitsFavoriteSong = checkIsExsitSongInLibrary(id);
    const action = isExsitsFavoriteSong ? "delete" : "add";

    try {
      let res;
      if (action === "add") {
        res = await addFavoriteSong(id);
      } else {
        res = await deleteFavoriteSong(id);
      }

      if (res?.data) {
        await fetchFavoriteSongs();
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.message || "Đã xảy ra lỗi");
    }
  }, []);
  // Thêm bài hát yêu thích vào danh sách
  const handleAdd = useCallback(async (songId) => {
    try {
      const res = await addFavoriteSong(songId);
      if (res.data?.favorite) {
        toast.success(res.data.message);
        return res.data;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Lỗi khi thêm bài hát yêu thích"
      );
      throw error;
    }
  }, []);
  // Xóa bài hát yêu thích khỏi thư viện
  const handleDelete = useCallback(async (songId) => {
    try {
      const res = await deleteFavoriteSong(songId);
      if (res.data?.favorite) {
        toast.success(res.data.message);
        return res.data;
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Lỗi khi thêm bài hát yêu thích"
      );
      throw error;
    }
  }, []);

  return {
    checkIsExsitSongInLibrary,
    handleAddAndDeleteFavoriteSong,
    handleAdd,
    handleDelete,
  };
};
