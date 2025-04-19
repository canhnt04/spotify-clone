import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status == 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.reject(err);
      try {
        const res = await axiosClient.post(
          `/auth/refresh?refreshToken=${refreshToken}`
        );
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("token", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        console.log(res);

        return axiosClient(originalRequest);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
  }
);

export default axiosClient;
