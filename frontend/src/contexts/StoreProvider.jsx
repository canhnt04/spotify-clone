import { createContext, useEffect, useState } from "react";
import { getMyInfo } from "../apis/authService";
import { getFavoriteSongs } from "../apis/songService";
import defaulAvatar from "../assets/images/default_avatar.jpg";
import noImage from "../assets/images/no_image.png";
import defaultVideo from "../assets/videos/video.mp4";
import { getLibrary } from "../apis/libraryService";
export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [library, setLibrary] = useState({
    users: null,
    albums: null,
  });
  const [currentSong, setCurrentSong] = useState(null);
  const [playList, setPlayList] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState(null);
  const token = localStorage.getItem("accessToken");

  // Lấy  thông tin THƯ VIỆN của người dùng
  const fetchMyLibrary = async () => {
    console.log("API Library called.");
    try {
      const res = await getLibrary();
      if (res.data && res.status == 200) {
        const data = res.data.data;
        setLibrary({ users: data?.users, albums: data?.albums });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy thông tin người dùng dựa vào token
  const fetchMyInfo = async () => {
    console.log("API get info called.");

    try {
      if (!token) return;
      const res = await getMyInfo(token);
      if (res.data) {
        const user = res.data.user;
        setUserInfo(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lấy danh sách bài hát yêu thích của người dùng đang dăng nhập
  const fetchFavoriteSongs = async () => {
    console.log("API Favorite song called.");
    try {
      const res = await getFavoriteSongs();
      if (res.data) {
        const favorite = res.data.favorites;
        setFavoriteSongs(favorite);
      }
    } catch (error) {
      setFavoriteSongs([]);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMyLibrary = async () => {
      const res = await getLibrary();
      if (res.data && res.status == 200) {
        const data = res.data.data;
        setLibrary({ users: data?.users, albums: data?.albums });
      }
    };

    fetchMyInfo();
    fetchFavoriteSongs();
    fetchMyLibrary();
  }, [token]);
  return (
    <StoreContext.Provider
      value={{
        noImage,
        defaulAvatar,
        defaultVideo,
        userInfo,
        library,
        currentSong,
        playList,
        favoriteSongs,
        setLibrary,
        setCurrentSong,
        setPlayList,
        setFavoriteSongs,
        fetchMyLibrary,
        fetchFavoriteSongs,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
