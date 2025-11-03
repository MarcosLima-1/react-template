import { STORAGE_KEYS } from "../core/storage";

export function saveTempMailInStorage(email: string) {
	localStorage.setItem(STORAGE_KEYS.TEMP_MAIL, email);
}
export function getStorageTempMail() {
	const email = localStorage.getItem(STORAGE_KEYS.TEMP_MAIL);
	return email;
}

export function deleteStorageTempMail() {
	localStorage.removeItem(STORAGE_KEYS.TEMP_MAIL);
}
