import axios, { InternalAxiosRequestConfig } from 'axios';
import config from 'config';
import { getLang } from 'locales/localeUtils';
import { tokenStorage } from 'utils/tokenUtils';

const axiosInstance = axios.create({
  baseURL: config.baseURL
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const accessToken = tokenStorage.getAccessToken();

      const requestLang = getLang();
      config.headers['portal-user-lang'] = requestLang;

      if (!accessToken) return config;

      config.headers['Authorization'] = `Bearer ${accessToken}`;

      return config;
    } catch (error) {
      console.error('Request interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor with retry logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject(new Error('NETWORK_ERROR'));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
