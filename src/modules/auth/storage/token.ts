import { canUseStorage } from "@/utils/can-use-storage";
import { STORAGE_KEYS } from "../core/storage";

export function saveTokenInStorage(token: string) {
	if (!canUseStorage()) return;

	localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

export function getStorageToken() {
	if (!canUseStorage()) return null;

	const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
	return token;
}

export function deleteStorageToken() {
	if (!canUseStorage()) return;

	localStorage.removeItem(STORAGE_KEYS.TOKEN);
}
