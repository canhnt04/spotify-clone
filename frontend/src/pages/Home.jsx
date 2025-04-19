import React from "react";
import List from "../components/ui/List/List";

const Home = () => {
  const songs = [
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
  return (
    <>
      <List data={songs} title={"Những bài hát thịnh hành"} />
      <List data={artists} title={"Nghệ sĩ phổ biến"} artist />
      <List data={songs} title={"Những bài hát thịnh hành"} />
    </>
  );
};

export default Home;
