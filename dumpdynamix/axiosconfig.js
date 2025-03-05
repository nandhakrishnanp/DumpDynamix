import axios from 'axios';

// app
const axiosInstance = axios.create({
  baseURL: 'http://192.168.39.170:3000/',
  //172.27.66.208
});
export default axiosInstance;