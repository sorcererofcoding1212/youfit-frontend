import axios from "axios";

// const BACKEND_URL = process.env.BACKEND_URL;
const BACKEND_URL = "localhost:3004";

const axiosInstance = axios.create({
  baseURL: `http://${BACKEND_URL}/api/v1`,
  withCredentials: true,
});

export default axiosInstance;
