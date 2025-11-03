import type { SessionProps } from "@/modules/auth/types/auth";
import { STORAGE_KEYS } from "../core/storage";

export function saveSessionInStorage(session: SessionProps) {
	localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

export function getStorageSession(): SessionProps | null {
	const token = localStorage.getItem(STORAGE_KEYS.SESSION);
	if (!token) return null;
	return JSON.parse(token);
}

export function deleteStorageSession() {
	localStorage.removeItem(STORAGE_KEYS.SESSION);
}
