import axios from "axios";

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_FILESTREAM_API,
  withCredentials: true,
});

export default axiosClient;
