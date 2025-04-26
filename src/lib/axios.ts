import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'SchoolToken': process.env.NEXT_PUBLIC_SCHOOL_TOKEN,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});
