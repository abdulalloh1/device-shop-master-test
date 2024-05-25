import axios, { AxiosError } from 'axios';
import AuthTokenCache from '@/cache/auth-token.cache';
import router from '@/router';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(function (request: any) {
  const token = AuthTokenCache.get();

  if (token && !request.headers.Authorization) {
    request.headers.Authorization = 'Bearer ' + token;
  }

  return request;
})

axiosInstance.interceptors.response.use(null, async (error: AxiosError) => {
  if (error?.response && error?.response?.status === 401) {
    AuthTokenCache.clear();
    await router.push({
      name: 'Login',
    })
  }

  return Promise.reject(error);
})

export default axiosInstance;
