import { type SessionProps, sessionSchema } from "@/modules/auth/types/auth";
import { toast } from "@/modules/notification/components/toasts";
import { canUseStorage } from "@/utils/can-use-storage";

export function saveSessionInStorage(data: SessionProps) {
	if (!canUseStorage()) return;

	const { data: session, success } = sessionSchema.safeParse(data);
	if (!success || !session) {
		toast.error({ title: "Session inválida!", description: "Faça login novamente." });
		throw new Error("Invalid session");
	}
	localStorage.setItem("session", JSON.stringify(session));
}

export function getStorageSession() {
	if (!canUseStorage()) return null;

	const data = localStorage.getItem("session");
	if (!data) return null;

	const { data: session, success } = sessionSchema.safeParse(JSON.parse(data));
	if (!success || !session) {
		toast.error({ title: "Session inválida!", description: "Faça login novamente." });
		return null;
	}

	return session;
}

export function deleteStorageSession() {
	if (!canUseStorage()) return;

	localStorage.removeItem("session");
}
