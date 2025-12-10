import axios from "axios";
import { env } from "@/lib/env";

const userAgent = navigator.userAgent;
export const api = axios.create({
	baseURL: env.VITE_URL_API,
	timeout: 20000,
	headers: {
		"x-app-version": env.VITE_WEB_VERSION,
		"x-device-platform": "WEB",
		"x-platform-version": userAgent,
	},
});

export const publicApi = axios.create({
	baseURL: env.VITE_URL_API,
	timeout: 10000,
	headers: {
		"X-app-version": env.VITE_WEB_VERSION,
		"X-device-platform": "WEB",
		"X-platform-version": userAgent,
	},
});
