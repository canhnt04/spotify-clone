import React, { useEffect, useState } from "react";
import List from "../components/ui/List/List";
import ScaleLoader from "react-spinners/ScaleLoader";
import MyModal from "../components/ui/MyModal/MyModal";
import { getSongs } from "../apis/songService";
import Swipper from "../components/ui/Swipper/Swipper";
import Card from "../components/ui/Card/Card";
import {
  Shuffle,
  SkipBack,
  Pause,
  SkipForward,
  Repeat,
  BarChartHorizontal,
} from "lucide-react";
import MusicPlayer from "../components/ui/MusicPlayer/MusicPlayer";
const Home = () => {
  // const songs = [
  //   {
  //     id: 1,
  //     name: "Nước mắt cá sấu",
  //     artistName: "HIEUTHUHAI",
  //     image: "https://i.scdn.co/image/ab67616d00001e024594668d4629f899daba689a",
  //   },
  //   {
  //     id: 2,
  //     name: "Ôm em thật lâu",
  //     artistName: "MONO",
  //     image: "https://i.scdn.co/image/ab67616d00001e024a7655026a9e80a95afba515",
  //   },
  //   {
  //     id: 3,
  //     name: "Lễ đường",
  //     artistName: "Kai Đinh",
  //     image: "https://i.scdn.co/image/ab67616d00001e0210ccec5b14a7b1b5c552d5cc",
  //   },
  //   {
  //     id: 4,
  //     name: "Phép màu - Đàn cá",
  //     artistName: "MAYDAYs, Minh Tốc & Lam",
  //     image: "https://i.scdn.co/image/ab67616d00001e02c51258e41841d5b0365054e7",
  //   },

  //   {
  //     id: 5,
  //     name: "Azizam",
  //     artistName: "Ed Sheeran",
  //     image: "https://i.scdn.co/image/ab67616d00001e025aac795808fc6b6d229c363b",
  //   },
  //   {
  //     id: 6,
  //     name: "Đến đây bên anh",
  //     artistName: "Cloud 5, Dangrangto",
  //     image: "https://i.scdn.co/image/ab67616d00001e02c7d258d4ce12b05006b28f64",
  //   },
  // ];
  const artists = [
    {
      id: 1,
      name: "Nước mắt cá sấu",
      artistName: "HIEUTHUHAI",
      image: "https://i.scdn.co/image/ab67616d00001e024594668d4629f899daba689a",
    },
    {
      id: 2,
      name: "Ôm em thật lâu",
      artistName: "MONO",
      image: "https://i.scdn.co/image/ab67616d00001e024a7655026a9e80a95afba515",
    },
    {
      id: 3,
      name: "Lễ đường",
      artistName: "Kai Đinh",
      image: "https://i.scdn.co/image/ab67616d00001e0210ccec5b14a7b1b5c552d5cc",
    },
    {
      id: 4,
      name: "Phép màu - Đàn cá",
      artistName: "MAYDAYs, Minh Tốc & Lam",
      image: "https://i.scdn.co/image/ab67616d00001e02c51258e41841d5b0365054e7",
    },

    {
      id: 5,
      name: "Azizam",
      artistName: "Ed Sheeran",
      image: "https://i.scdn.co/image/ab67616d00001e025aac795808fc6b6d229c363b",
    },
    {
      id: 6,
      name: "Đến đây bên anh",
      artistName: "Cloud 5, Dangrangto",
      image: "https://i.scdn.co/image/ab67616d00001e02c7d258d4ce12b05006b28f64",
    },
  ];

  const [songs, setSongs] = useState([]);

  const getListSongs = async () => {
    try {
      const res = await getSongs();
      if (res?.data && res?.data.data) {
        setSongs(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListSongs();
  }, []);

  return (
    <>
      <Swipper data={songs} itemPerPage={6} showNavigation={true}>
        {(item) => (
          <Card
            id={item.id}
            image={item.thumbnail_url}
            name={item.title}
            artistName={item.artist}
          />
        )}
      </Swipper>

      <div className="min-h-screen p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Now Playing */}
          <MusicPlayer />

          {/* Mostly Played */}
          <div className="bg-[#202020] rounded-2xl shadow-lg p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mostly Played</h2>
              <span className="text-sm text-gray-500">
                55 songs on the list
              </span>
            </div>
            {songs.map((song, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 px-2 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold w-5 text-gray-600">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <img
                    src={song.thumbnail_url}
                    alt={song.title}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{song.title}</p>
                    <p className="text-xs text-gray-500">{song.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{song.duration}</span>
                  <BarChartHorizontal className="text-gray-400 w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <List data={artists} title={"Nghệ sĩ phổ biến"} artist />
      <List data={songs} title={"Những bài hát thịnh hành"} /> */}
    </>
  );
};

export default Home;
