import axios from 'axios';
import { getBearerToken } from '@/common/utils/localStorageManager';

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

axiosPrivate.interceptors.request.use((config) => {
  const token = getBearerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
