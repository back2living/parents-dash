import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie"
import { logout } from "@/api/auth.api";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const baseUrl = process.env.NEXT_PUBLIC_API;
const instance: AxiosInstance = axios.create({ baseURL: baseUrl, withCredentials: true });

interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    skipAuthRefresh?: boolean;
}

const refreshToken = async (): Promise<RefreshTokenResponse | null> => {
    try {
        const config: CustomAxiosRequestConfig = { skipAuthRefresh: true };
        const { data }: AxiosResponse<RefreshTokenResponse> = await instance.get(`${baseUrl}/auth/refresh`, config);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const refreshEndpoint = async (): Promise<void> => {
    const res = await refreshToken();
    if (res !== null) {
        return Promise.resolve();
    } else {
        logout().then(() => {
            Cookies.remove("pgCurrentUser");
            window.location.href = "/signin";
        }).catch(() => {
            Cookies.remove("pgCurrentUser");
            window.location.href = "/signin";
        });
        return Promise.reject(new Error("Something went wrong"));
    }
};

instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError): Promise<never> => {
        return Promise.reject(error);
    }
);

createAuthRefreshInterceptor(instance, refreshEndpoint, {
    pauseInstanceWhileRefreshing: false,
});

export default instance;
