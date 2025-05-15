import axiosClient from "./axiosClient";

const register = async (body) => {
  return await axiosClient.post("/register/", body);
};

const login = async (body) => {
  return await axiosClient.post("/login/", body);
};

const getMyInfo = async () => {
  return await axiosClient.get("/profile/");
};

const getListUser = async () => {
  return await axiosClient.get("/user-list/");
};

const getInfoProfile = async (id) => {
  return await axiosClient.get(`/profile/other/${id}`);
};

const banUser = async (id) => {
  return await axiosClient.post(`/user-ban/${id}/`);
};

const unBanUser = async (id) => {
  return await axiosClient.post(`/user-unban/${id}/`);
};

export {
  register,
  login,
  getMyInfo,
  getListUser,
  getInfoProfile,
  banUser,
  unBanUser,
};
