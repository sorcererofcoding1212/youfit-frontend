import axios from "axios";

const BACKEND_URL = process.env.BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: `http://${BACKEND_URL}/api/v1`,
  withCredentials: true,
});

export default axiosInstance;
