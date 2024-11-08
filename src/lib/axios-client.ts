import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_FILESTREAM_API,
  headers: {
    "Access-Control-Allow-Credentials": "true",
  },
});

export default axiosClient;
