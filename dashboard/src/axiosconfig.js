import axios from "axios";
//dashboard
const axiosInstance = axios.create({
  baseURL: "http://172.27.66.208:3000/",
});

export default axiosInstance;
