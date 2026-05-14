import { isClientSide } from "@/utils/is-client-side";
import { STORAGE_KEYS } from "../core/storage";

export function saveTempCodeInStorage(code: string) {
	if (!isClientSide()) return;

	localStorage.setItem(STORAGE_KEYS.TEMP_CODE, code);
}

export function getTempCodeFromStorage() {
	if (!isClientSide()) return null;

	const code = localStorage.getItem(STORAGE_KEYS.TEMP_CODE);
	return code;
}

export function hasTempCodeInStorage() {
	if (!isClientSide()) return false;

	return localStorage.getItem(STORAGE_KEYS.TEMP_CODE) !== null;
}
