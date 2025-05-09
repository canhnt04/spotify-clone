import { createContext, useEffect, useState } from "react";
import { getMyInfo } from "../apis/authService";
import { getFavoriteSongs } from "../apis/songService";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [playList, setPlayList] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState(null);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      getMyInfo(token)
        .then((res) => {
          if (res.data) {
            const user = res.data.user;
            setUserInfo(user);
          }
        })
        .catch((err) => console.log(err));
    }

    const fetchFavoriteSongs = async () => {
      await getFavoriteSongs()
        .then((res) => {
          if (res.data) {
            const favorite = res.data.favorites;
            setFavoriteSongs(favorite);
          }
        })
        .catch((error) => console.log(error));
    };

    console.log(userInfo);
    fetchFavoriteSongs();
  }, [token]);
  return (
    <StoreContext.Provider
      value={{
        userInfo,
        currentSong,
        setCurrentSong,
        playList,
        setPlayList,
        favoriteSongs,
        setFavoriteSongs,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
