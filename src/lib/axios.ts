import { envs } from "@/lib/envs";
import axios from "axios";

const userAgent = navigator.userAgent;
export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 20000,
	headers: {
		"x-app-version": envs.VITE_WEB_VERSION,
		"x-device-platform": "WEB",
		"x-platform-version": userAgent,
	},
});

export const publicApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
	headers: {
		"X-app-version": envs.VITE_WEB_VERSION,
		"X-device-platform": "WEB",
		"X-platform-version": userAgent,
	},
});
