import axiosClient from "./axiosClient";

const getSongs = async () => {
  return await axiosClient.get("/song/list/");
};

const getMyListSong = async () => {
  return await axiosClient.get("/song/list/user/");
};

const upload = async (body) => {
  return await axiosClient.post("/song/create/", body);
};

export { upload, getSongs, getMyListSong };
