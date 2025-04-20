import axiosClient from "./axiosClient";

const getSongs = async () => {
  return await axiosClient.get("/song/list/");
};

const upload = async (body) => {
  return await axiosClient.post("/song/upload/", body);
};

export { upload, getSongs };
