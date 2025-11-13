import { STORAGE_KEYS } from "@/modules/auth/core/storage";
import { validateEmail } from "@/utils/validators/validate-email";

export function saveTempMailInStorage(email: string) {
	localStorage.setItem(STORAGE_KEYS.TEMP_MAIL, email);
}
export function getStorageTempMail() {
	const email = localStorage.getItem(STORAGE_KEYS.TEMP_MAIL);
	const { success } = validateEmail.safeParse(email);

	if (!success) return null;
	return email;
}

export function deleteStorageTempMail() {
	localStorage.removeItem(STORAGE_KEYS.TEMP_MAIL);
}
