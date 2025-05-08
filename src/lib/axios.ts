import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    SchoolToken: process.env.NEXT_PUBLIC_SCHOOL_TOKEN,
    Authorization: `Bearer ${Cookies.get("token")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
