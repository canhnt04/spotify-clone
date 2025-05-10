import axiosClient from "./axiosClient";

const getLibrary = () => {
  return axiosClient.get("/library/list");
};

const addAlbumToLibrary = (id) => {
  return axiosClient.post(`library/add-album/${id}/`);
};

const addUserToLibrary = (id) => {
  return axiosClient.post(`library/add-user/${id}/`);
};

const deleteAlbumToLibrary = (id) => {
  return axiosClient.delete(`library/delete-album/${id}/`);
};

const deleteUserToLibrary = (id) => {
  return axiosClient.delete(`library/delete-user/${id}/`);
};

export {
  getLibrary,
  addAlbumToLibrary,
  addUserToLibrary,
  deleteAlbumToLibrary,
  deleteUserToLibrary,
};
