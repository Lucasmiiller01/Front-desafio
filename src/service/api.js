import axios from "axios";


const api = axios.create({
  baseURL: "http://18.229.84.216"
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('__tokenAccess');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;