import type { AxiosError, InternalAxiosRequestConfig } from "axios";

export interface AxiosRequestRetryConfig extends InternalAxiosRequestConfig {
	_isRetry: true;
}

export interface AxiosRetryError extends AxiosError {
	config: AxiosRequestRetryConfig;
}
