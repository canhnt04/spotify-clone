import React, { useContext, useEffect, useState } from "react";
import { getSongs } from "../apis/songService";
import { getListUser } from "../apis/authService";
import Swipper from "../components/ui/Swipper/Swipper";
import Card from "../components/ui/Card/Card";
import Loading from "../components/ui/Loading/Loading";
import { StoreContext } from "../contexts/StoreProvider";
import { getAllAlbum } from "../apis/albumService";
import { useSong } from "../components/hooks/useSong";
import { useAuth } from "../components/hooks/useAuth";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, currentSong } = useContext(StoreContext);
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState(null);
  const [videos, setVideos] = useState(null);
  const { getVideoSong } = useSong();
  const { getListUsers } = useAuth();

  const fetchListSongs = async () => {
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

  const fetchListUsers = async () => {
    setIsLoading(true);
    const res = await getListUsers();
    if (res) {
      setIsLoading(false);
      setUsers(res);
    }
  };

  const fetchListAlbum = async () => {
    try {
      const res = await getAllAlbum();
      if (res.data) {
        setAlbums(res.data.album);
        console.log("List albums :", res.data.album);
      }
    } catch (error) {}
  };

  const fetchListVideoSong = async () => {
    const listVideoSong = await getVideoSong();
    if (listVideoSong) {
      setVideos(listVideoSong);
    }
  };

  useEffect(() => {
    fetchListSongs();
    fetchListUsers();
    fetchListAlbum();
    fetchListVideoSong();
  }, []);

  return (
    <>
      <Loading isOpen={isLoading} />
      <Swipper
        data={songs}
        itemPerPage={currentSong ? 4 : 6}
        showNavigation={true}
        title={"Được đề xuất cho hôm nay"}
      >
        {(item) => <Card data={item} />}
      </Swipper>

      {userInfo && (
        <Swipper
          data={users}
          itemPerPage={currentSong ? 4 : 6}
          showNavigation={true}
          title={"Người dùng được gợi ý"}
        >
          {(item) => <Card artistType data={item} />}
        </Swipper>
      )}

      <Swipper
        data={albums}
        itemPerPage={currentSong ? 4 : 6}
        showNavigation={true}
        title={"Album đã phát hành"}
      >
        {(item) => (
          <Card
            data={item}
            artistType={false}
            showDetailAlbum={true}
            hidePlayButton={false}
            showModalIfUnauth={false}
          />
        )}
      </Swipper>

      <Swipper
        data={videos}
        itemPerPage={currentSong ? 4 : 6}
        showNavigation={true}
        title={"Video âm nhạc"}
      >
        {(item) => (
          <Card
            isVideo
            data={item}
            artistType={false}
            hidePlayButton={false}
            showModalIfUnauth={false}
          />
        )}
      </Swipper>
    </>
  );
};

export default Home;
