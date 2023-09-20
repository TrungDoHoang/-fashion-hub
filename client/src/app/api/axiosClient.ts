import axios from 'axios';
import { LOCAL_STORAGE_KEY } from '../../constants';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    try {
      const { response } = err;
      if (response.status === 401) {
        localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      }
    } catch (error) {
      console.log(error);
    }

    throw err;
  }
);

export default axiosClient;
