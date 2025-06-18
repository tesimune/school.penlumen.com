import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'x-school-token': process.env.NEXT_PUBLIC_SCHOOL_TOKEN,
    Authorization: `Bearer ${Cookies.get('token')}`,
    'x-branch-session': `${Cookies.get('branch')}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const user = Cookies.get('user');
    const token = Cookies.get('token');
    if (user && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data.error === 'unauthenticated') {
      Cookies.remove('user');
      Cookies.remove('token');
      Cookies.remove('branch');
      window.location.href = '/login';
    }
    return Promise.reject(error.response.data);
  }
);
