import axiosClient from "./axiosClient";

const getSongs = async () => {
  return await axiosClient.get("/song/list/");
};

const getMyListSong = async () => {
  return await axiosClient.get("/song/list/user/");
};

const getSongById = async (id) => {
  return await axiosClient.get(`/song/detail/${id}`);
};

const upload = async (body) => {
  return await axiosClient.post("/song/create/", body);
};

const getFavoriteSongs = async () => {
  return await axiosClient.get("/favorite/list/");
};

const addFavoriteSong = async (id) => {
  return await axiosClient.post(`/favorite/create/${id}/`);
};

export {
  upload,
  getSongs,
  getMyListSong,
  getSongById,
  getFavoriteSongs,
  addFavoriteSong,
};
