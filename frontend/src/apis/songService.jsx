import axiosClient from "./axiosClient";

const getSongs = async () => {
  return await axiosClient.get("/song/list/");
};

const getListSongOfUser = async (id) => {
  return await axiosClient.get(`/song/list/user/${id}/`);
};

const getSongById = async (id) => {
  return await axiosClient.get(`/song/detail/${id}`);
};

const upload = async (body) => {
  return await axiosClient.post("/song/create/", body);
};

// Favorite API

const getFavoriteSongs = async () => {
  return await axiosClient.get("/favorite/list/");
};

const addFavoriteSong = async (id) => {
  return await axiosClient.post(`/favorite/create/${id}/`);
};

const deleteFavoriteSong = async (id) => {
  return await axiosClient.delete(`/favorite/delete/${id}/`);
};

export {
  upload,
  getSongs,
  getListSongOfUser,
  getSongById,
  getFavoriteSongs,
  addFavoriteSong,
  deleteFavoriteSong,
};
