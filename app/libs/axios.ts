import Axios from "axios";
import type { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { API_URL } from "@/config";
import { storage } from "@/utils/storage";
/**
 * @description https://github.com/axios/axios/issues/5573#issuecomment-1489596178
 */
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

async function authRequestInterceptor(
  config: AdaptAxiosRequestConfig,
): Promise<AdaptAxiosRequestConfig> {
  const token = await storage.getItemAsync("token");

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

const axios = Axios.create({
  baseURL: `${API_URL}/api/v1`,
});

async function handleUnAuthorizedError(): Promise<void> {
  await storage.clearItem("token");
}

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status !== 401) {
      return await Promise.reject(error);
    }
    await handleUnAuthorizedError();
  },
);

export { axios };
