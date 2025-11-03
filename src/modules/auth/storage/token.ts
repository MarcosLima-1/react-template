import { STORAGE_KEYS } from "../core/storage";

export function saveTokenInStorage(token: string) {
	localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

export function getStorageToken() {
	const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
	return token;
}

export function deleteStorageToken() {
	localStorage.removeItem(STORAGE_KEYS.TOKEN);
}
