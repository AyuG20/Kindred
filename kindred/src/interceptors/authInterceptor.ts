import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  } as AxiosRequestHeaders,
});


apiClient.interceptors.request.use(
  (config) => {
    config.headers.set("Accept", "application/json");

    if (config.data instanceof FormData) {
      config.headers.delete("Content-Type");
    } else {
      config.headers.set("Content-Type", "application/json");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ?? error.message;

      return Promise.reject(new Error(message));
    }

    return Promise.reject(new Error("Request failed"));
  },
);

export const requestInterceptor = async <T>(
  endpoint: string,
  options: AxiosRequestConfig = {},
): Promise<T> => {
  const config: AxiosRequestConfig = {
    ...options,
    url: endpoint,
    method: options.method ?? "GET",
    headers: {
      ...(options.headers ?? {}),
    },
    data: options.data ?? (options as any).body,
  };

  const response = await apiClient.request<T>(config);

  return response.data;
};