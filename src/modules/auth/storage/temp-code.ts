import { canUseStorage } from "@/utils/can-use-storage";
import { STORAGE_KEYS } from "../core/storage";

export function saveTempCodeInStorage(code: string) {
	if (!canUseStorage()) return;

	localStorage.setItem(STORAGE_KEYS.TEMP_CODE, code);
}

export function getTempCodeFromStorage() {
	if (!canUseStorage()) return null;

	const code = localStorage.getItem(STORAGE_KEYS.TEMP_CODE);
	return code;
}

export function hasTempCodeInStorage() {
	if (!canUseStorage()) return false;

	return localStorage.getItem(STORAGE_KEYS.TEMP_CODE) !== null;
}
