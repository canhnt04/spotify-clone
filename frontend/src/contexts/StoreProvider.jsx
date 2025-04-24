import { createContext, useEffect, useState } from "react";
import { getMyInfo } from "../apis/authService";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
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

    console.log(userInfo);
  }, [token]);
  return (
    <StoreContext.Provider value={{ userInfo, currentSong, setCurrentSong }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
