import axios from "axios";

// Axios base instance
export const fetchFromAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});
