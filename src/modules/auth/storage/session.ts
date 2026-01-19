import { type SessionProps, sessionSchema } from "@/modules/auth/types/auth";
import { toast } from "@/modules/notification/components/toasts";
import { STORAGE_KEYS } from "../core/storage";

export function saveSessionInStorage(data: SessionProps) {
	const { data: session, success } = sessionSchema.safeParse(data);

	if (!success || !session) {
		toast.error({ title: "Session inválida!", description: "Faça login novamente." });
		throw new Error("Invalid session");
	}

	localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

export function getStorageSession(): SessionProps | null {
	const data = localStorage.getItem(STORAGE_KEYS.SESSION);
	if (!data) return null;

	const { data: session, success } = sessionSchema.safeParse(JSON.parse(data));

	if (!success || !session) {
		toast.error({ title: "Session inválida!", description: "Faça login novamente." });
		return null;
	}

	return session;
}

export function deleteStorageSession() {
	localStorage.removeItem(STORAGE_KEYS.SESSION);
}
