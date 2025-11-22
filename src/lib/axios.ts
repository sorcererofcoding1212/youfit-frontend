import axios from "axios";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://192.168.29.179:3004";

const axiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  withCredentials: true,
});

export default axiosInstance;
