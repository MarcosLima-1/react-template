import { api } from "@/lib/axios";
import { getStorageToken } from "@/modules/auth/storage/token/token";
import type { AxiosRequestRetryConfig } from "@/modules/auth/types/axios-error";

export function setupAuthRequestInterceptor() {
	return api.interceptors.request.use(
		async (config) => {
			const requestConfig = config as AxiosRequestRetryConfig;

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
