import axios, { InternalAxiosRequestConfig } from "axios";
import { useRouter } from "next/router";

let accessToken: string | null = null;

let failedRequestsQueue: { resolve: (value: unknown) => void; reject: (reason: unknown) => void; }[] = [];
let isRefreshing = false;

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const setAccessToken = (token: string) => {
    accessToken = token;
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete api.defaults.headers.common["Authorization"];
    }
};

api.interceptors.response.use(
    (response) => response,

    async(error) => {
        const router = useRouter();
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                if (error.response.status === 401) {
                    window.location.href = "/auth/callback";
                }
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({ resolve, reject });
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await api.post('/auth/refresh');
                const newAccessToken = data.accessToken;

                setAccessToken(newAccessToken);

                failedRequestsQueue.forEach((promise: { resolve: (value: unknown) => void; reject: (reason: unknown) => void; }) => promise.resolve(api(originalRequest)));
                failedRequestsQueue = [];

                return api(originalRequest);
            } catch (err) {
                failedRequestsQueue.forEach((request: { resolve: (value: unknown) => void; reject: (reason: unknown) => void; }) => request.reject(err));
                failedRequestsQueue = [];

                if (typeof window !== 'undefined') {
                    router.push('/sign-in');
                }

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);


api.interceptors.request.use(config => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


export default api;