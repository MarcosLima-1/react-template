import Cookies from "js-cookie";
import { defaultCookiesConfig, TOKEN_KEY } from "@/modules/auth/constants/storage";

export function saveTokenInStorage(token: string) {
	Cookies.set(TOKEN_KEY, token, defaultCookiesConfig);
}

export function getStorageToken() {
	const token = Cookies.get(TOKEN_KEY);
	return token;
}

export function deleteStorageToken() {
	Cookies.remove(TOKEN_KEY);
}
