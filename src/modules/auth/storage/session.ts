import { type SessionProps, sessionSchema } from "@/modules/auth/types/auth";
import { STORAGE_KEYS } from "../core/storage";

export function saveSessionInStorage(session: SessionProps) {
	localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

export function getStorageSession(): SessionProps | null {
	const data = localStorage.getItem(STORAGE_KEYS.SESSION);
	if (!data) return null;

	const { data: session, success } = sessionSchema.safeParse(JSON.parse(data));

	if (!success || !session) return null;

	return session;
}

export function deleteStorageSession() {
	localStorage.removeItem(STORAGE_KEYS.SESSION);
}
