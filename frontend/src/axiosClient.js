import axios from "axios";

//baseURL: "https://expodb-backend.onrender.com/api/v1/",
const axiosClient = axios.create({
  /* baseURL: "https://usermanagement-backend-6wmt.onrender.com/" */
  baseURL: "http://localhost:3001/",
});
// Add a request interceptor to set the Authorization header before each request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
