import axios, { AxiosRequestConfig } from "axios";
import runAsync from "lib/run-async";

const axiosBaseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const fetchFromAPI = async (url: string, config: AxiosRequestConfig) => {
  const response = await runAsync(axiosBaseInstance(url, config));
  if (typeof response.error === "string") {
    return { isError: true, msg: response.error };
  }
  if (response.error?.response?.data) {
    return response.error.response.data;
  }
  return response.result.response.data;
};

export default fetchFromAPI;
