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

export { register, login, getMyInfo, getListUser };
