import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_URL_API_DEV,
	timeout: 20000,
});

export const publicApi = axios.create({
	baseURL: import.meta.env.VITE_URL_API_DEV,
	timeout: 10000,
});
