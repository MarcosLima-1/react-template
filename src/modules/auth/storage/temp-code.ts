import { STORAGE_KEYS } from "../core/storage";

export function saveTempCodeInStorage(code: string) {
	localStorage.setItem(STORAGE_KEYS.TEMP_CODE, code);
}
export function getStorageTempCode() {
	const code = localStorage.getItem(STORAGE_KEYS.TEMP_CODE);
	return code;
}

export function deleteStorageTempCode() {
	localStorage.removeItem(STORAGE_KEYS.TEMP_CODE);
}
