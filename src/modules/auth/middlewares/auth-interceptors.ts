import { type AxiosResponse, isAxiosError } from "axios";
import { api } from "@/lib/axios";
import { getStorageToken } from "@/modules/auth/storage/token";
import { signOut } from "@/modules/auth/utils/auth";

export function setupAuthRequestInterceptor() {
	return api.interceptors.request.use(
		async (config) => {
			const requestConfig = config;

			if (!requestConfig._isRetry && !requestConfig.headers.Authorization) {
				const token = getStorageToken();
				if (token) {
					requestConfig.headers.Authorization = `Bearer ${token}`;
					api.defaults.headers.common.Authorization = `Bearer ${token}`;
				}
			}
			return requestConfig;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
}

export function setupAuthResponseInterceptor() {
	return api.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		async (error: unknown) => {
			if (!isAxiosError(error) || !error.config) {
				return Promise.reject(error);
			}

			const axiosError = error;
			const requestConfig = axiosError.config;

			if (requestConfig?._isRetry) {
				signOut();
				return Promise.reject(error);
			}

			const isInvalidSessionError = error.response?.status === 498 || error.response?.status === 401;

			if (isInvalidSessionError) {
				signOut();
			}

			return Promise.reject(error);
		},
	);
}
