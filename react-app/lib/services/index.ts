import axios, { AxiosRequestConfig } from "axios";
import runAsync from "lib/base/run-async";

const axiosBaseInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

interface ApiResponse {
  isError: boolean;
  msg: string;
  data?: any;
}

const fetchFromAPI = async (
  url: string,
  config: AxiosRequestConfig
): Promise<ApiResponse> => {
  const response = await runAsync(axiosBaseInstance(url, config));
  if (typeof response.error === "string") {
    return { isError: true, msg: response.error };
  }
  if (response.error?.response?.data) {
    const data = response.error.response.data;
    return {
      isError: data.isError ?? true,
      msg: data.msg ?? "🐦 Something went wrong",
    };
  }
  const data = response.result.data;
  return {
    isError: data.isError ?? true,
    msg: data.msg ?? "🐦 Something went wrong",
    data: data.data,
  };
};

export default fetchFromAPI;
