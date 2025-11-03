import { deleteStorageSession, saveSessionInStorage } from "@/modules/auth/storage/session";
import { deleteStorageToken, saveTokenInStorage } from "@/modules/auth/storage/token";
import type { SaveSessionDataProps } from "@/modules/auth/types/auth";

export function saveSessionData({ accessToken, session }: SaveSessionDataProps) {
	if (accessToken) {
		saveTokenInStorage(accessToken);
	}
	if (session) {
		saveSessionInStorage(session);
	}
}

export function deleteSessionData() {
	deleteStorageToken();
	deleteStorageSession();
}
