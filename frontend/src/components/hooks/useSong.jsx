import { useCallback, useContext } from "react";
import {
  getListSongOfUser,
  getSongById,
  getSongs,
} from "../../apis/songService";
import { StoreContext } from "../../contexts/StoreProvider";

export const useSong = () => {
  const { userInfo } = useContext(StoreContext);
  // Lấy danh sách bài hát của người dùng đang đang nhập
  const getListSongOfuser = useCallback(async (id) => {
    try {
      // Gọi api từ songService
      const res = await getListSongOfUser(id);
      if (res?.data && res?.data.data) {
        console.log("Danh sách bài hát của tôi:", res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  // Lấy danh sách video
  const getVideoSong = useCallback(async () => {
    try {
      // Gọi api từ songService
      const res = await getSongs();
      if (res?.data && res?.data.data) {
        const list = res.data.data;

        return list?.filter((item) => item.video_url != null);

        // let video = [];
        // list?.map((item) => {
        //   if (item.audio_url == null) {
        //     video.push(item);
        //   }
        // });
        // return video;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  // Lấy thông tin bài hát hoặc video
  const getDetailSongOrVideo = useCallback(async (id) => {
    try {
      // Gọi api từ songService
      const res = await getSongById(id);
      if (res?.data && res?.data.data) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return { getListSongOfuser, getVideoSong, getDetailSongOrVideo };
};
