import axios from 'axios';

import { getBearerToken } from '@/dataManager/localStorageManager';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API,
  headers: {
    Authorization: `Bearer ${getBearerToken()}`,
  },
});
