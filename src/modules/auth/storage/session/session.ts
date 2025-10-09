import Cookies from "js-cookie";
import { defaultCookiesConfig, SESSION_KEY } from "@/modules/auth/constants/storage";
import type { SessionProps } from "@/modules/auth/types/auth";

export function saveSessionInStorage(session: SessionProps) {
	Cookies.set(SESSION_KEY, JSON.stringify(session), { ...defaultCookiesConfig, expires: 30 });
}

export function getStorageSession(): SessionProps | null {
	const token = Cookies.get(SESSION_KEY);
	if (!token) return null;
	return JSON.parse(token);
}

export function deleteStorageSession() {
	Cookies.remove(SESSION_KEY);
}
