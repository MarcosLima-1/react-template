import { STORAGE_KEYS } from "@/modules/auth/core/storage";
import { canUseStorage } from "@/utils/can-use-storage";
import { validateEmail } from "@/utils/validators/validate-email";

export function saveTempMailInStorage(email: string) {
	if (!canUseStorage()) return;

	localStorage.setItem(STORAGE_KEYS.TEMP_MAIL, email);
}

export function getStorageTempMail() {
	if (!canUseStorage()) return null;

	const email = localStorage.getItem(STORAGE_KEYS.TEMP_MAIL);
	const { success } = validateEmail.safeParse(email);

	if (!success) return null;
	return email;
}

export function deleteStorageTempMail() {
	if (!canUseStorage()) return;

	localStorage.removeItem(STORAGE_KEYS.TEMP_MAIL);
}
