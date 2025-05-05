import React, { useContext, useEffect, useState } from "react";
import { getSongs } from "../apis/songService";
import { getListUser } from "../apis/authService";
import Swipper from "../components/ui/Swipper/Swipper";
import Card from "../components/ui/Card/Card";
import Loading from "../components/ui/Loading/Loading";
import { StoreContext } from "../contexts/StoreProvider";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(StoreContext);
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);

  const getListSongs = async () => {
    setIsLoading(true);
    try {
      const res = await getSongs();
      if (res?.data && res?.data.data) {
        setSongs(res.data.data);
        setIsLoading(false);
        console.log("Danh sách bài hát :", res.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const getListUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getListUser();
      if (res?.data && res?.data.users) {
        setUsers(res.data.users);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getListSongs();
    getListUsers();
  }, []);

  return (
    <>
      <Loading isOpen={isLoading} />
      <Swipper
        data={songs}
        itemPerPage={4}
        showNavigation={true}
        title={"Được đề xuất cho hôm nay"}
      >
        {(item) => <Card data={item} />}
      </Swipper>

      {userInfo && (
        <Swipper
          data={users}
          itemPerPage={4}
          showNavigation={true}
          title={"Người dùng được gợi ý"}
        >
          {(item) => <Card artistType data={item} />}
        </Swipper>
      )}

      <Swipper
        data={songs}
        itemPerPage={4}
        showNavigation={true}
        title={"Bài hát thịnh hành"}
      >
        {(item) => <Card data={item} />}
      </Swipper>
    </>
  );
};

export default Home;
