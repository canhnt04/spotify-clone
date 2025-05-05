import axiosClient from "./axiosClient";

const update = async (body) => {
  return await axiosClient.put("profile/update/", body);
};

export { update };
