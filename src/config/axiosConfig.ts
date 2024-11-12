import axios from "axios";
import { requestInterceptor } from "./interceptors/requestInterceptor";
import { responseInterceptor } from "./interceptors/responseInterceptor";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  responseInterceptor
);

export default axiosInstance;
