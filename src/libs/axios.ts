import axios from 'axios';

import { getBearerToken } from '@/dataManager/localStorageManager';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getBearerToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
