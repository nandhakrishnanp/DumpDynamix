import axios from 'axios';

// app
const axiosInstance = axios.create({
  baseURL: 'http://172.27.66.208:3000/',
  //172.27.66.208
});
export default axiosInstance;