import { isClientSide } from "@/utils/is-client-side";
import { STORAGE_KEYS } from "../core/storage";

export function saveTokenInStorage(token: string) {
	if (!isClientSide()) return;

	localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

export function getStorageToken() {
	if (!isClientSide()) return null;

	const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
	return token;
}

export function deleteStorageToken() {
	if (!isClientSide()) return;

	localStorage.removeItem(STORAGE_KEYS.TOKEN);
}
