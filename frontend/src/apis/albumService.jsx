import axiosClient from "./axiosClient";

const postAlbum = async (body) => {
  return await axiosClient.post("/album/create/", body);
};

const getAllAlbum = async () => {
  return await axiosClient.get("/album/list/");
};

const getMyAlbum = async () => {
  return await axiosClient.get("/album/user/");
};

const getDetailAlbum = async (id) => {
  return await axiosClient.get(`/album/detail/${id}`);
};

const updateAlbum = async (id, formData) => {
  return await axiosClient.put(`/album/update/${id}`, formData);
};

const deleteAlbum = async (id) => {
  return await axiosClient.delete(`/album/delete/${id}`);
};

const postSongToAlbum = async (albumId, songId) => {
  return await axiosClient.post(`album/${albumId}/add-song/${songId}/`);
};

const deleteSongFromAlbum = async (albumId, songId) => {
  return await axiosClient.delete(`album/${albumId}/delete-song/${songId}/`);
};

export {
  postAlbum,
  getAllAlbum,
  getMyAlbum,
  getDetailAlbum,
  updateAlbum,
  deleteAlbum,
  postSongToAlbum,
  deleteSongFromAlbum,
};
