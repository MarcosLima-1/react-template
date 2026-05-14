import { STORAGE_KEYS } from "@/modules/auth/core/storage";
import { isClientSide } from "@/utils/is-client-side";
import { validateEmail } from "@/utils/validators/validate-email";

export function saveTempMailInStorage(email: string) {
	if (!isClientSide()) return;

	localStorage.setItem(STORAGE_KEYS.TEMP_MAIL, email);
}

export function getStorageTempMail() {
	if (!isClientSide()) return null;

	const email = localStorage.getItem(STORAGE_KEYS.TEMP_MAIL);
	const { success } = validateEmail.safeParse(email);

	if (!success) return null;
	return email;
}

export function deleteStorageTempMail() {
	if (!isClientSide()) return;

	localStorage.removeItem(STORAGE_KEYS.TEMP_MAIL);
}
