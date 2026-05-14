import { type SessionProps, sessionSchema } from "@/modules/auth/types/auth";
import { toast } from "@/modules/notification/components/toasts";
import { isClientSide } from "@/utils/is-client-side";

export function saveSessionInStorage(data: SessionProps) {
	if (!isClientSide()) return;

	const { data: session, success } = sessionSchema.safeParse(data);
	if (!success || !session) {
		toast.error({ title: "Session inválida!", description: "Faça login novamente." });
		throw new Error("Invalid session");
	}
	localStorage.setItem("session", JSON.stringify(session));
}

export function getStorageSession() {
	if (!isClientSide()) return null;

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
	if (!isClientSide()) return;

	localStorage.removeItem("session");
}
