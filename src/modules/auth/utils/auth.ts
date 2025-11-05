import { toast } from "sonner";
import { queryKeys } from "@/core/query-keys.ts";
import { route } from "@/core/routes.ts";
import { queryClient } from "@/lib/tanstack-query/client";
import { getStorageSession } from "@/modules/auth/storage/session.ts";
import { type SaveSessionDataProps, type SessionProps, sessionSchema } from "@/modules/auth/types/auth";
import { deleteSessionData, saveSessionData } from "@/modules/auth/utils/utils.ts";

export function signOut() {
	const callbackurl = location.pathname;
	deleteSessionData();
	queryClient.clear();

	location.replace(`${route.LOGIN_URL}?redirect=${callbackurl}`);
}

interface SignInProps extends SaveSessionDataProps {
	redirect?: string;
}

export function signIn({ redirect, session, accessToken }: SignInProps) {
	if (!session || !accessToken) {
		toast.error("Props da sessão invalidos!!");
		return;
	}

	queryClient.refetchQueries({ queryKey: queryKeys.session() });

	saveSessionData({ session, accessToken });
	location.replace(redirect || route.DEFAULT_AUTHENTICATED_URL);
}

export function getSession(): SessionProps | null {
	const session = getStorageSession();

	const validation = sessionSchema.safeParse(session);

	if (!session || validation.success === false) return null;

	return session;
}

export function getExistingSession(): SessionProps {
	// biome-ignore lint/style/noNonNullAssertion: Função usada em lugares onde sempre terá a session, caso não exista ele deslogará o usuário
	const session = getStorageSession()!;
	const validation = sessionSchema.safeParse(session);

	if (!session || validation.success === false) {
		throw signOut();
	}

	return session;
}
