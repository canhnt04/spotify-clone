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

export { postAlbum, getAllAlbum, getMyAlbum, getDetailAlbum };
