import { queryKeys } from "@/core/query-keys.ts";
import { route } from "@/core/routes.ts";
import { queryClient } from "@/lib/tanstack-query/client";
import { getStorageSession } from "@/modules/auth/storage/session.ts";
import type { SaveSessionDataProps, SessionProps } from "@/modules/auth/types/auth";
import { deleteSessionData, saveSessionData } from "@/modules/auth/utils/utils.ts";
import { toast } from "@/modules/notification/components/toasts";

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
		toast.error({ title: "Erro ao Logar", description: "Props da sessão inválidos!" });
		return;
	}

	queryClient.refetchQueries({ queryKey: queryKeys.session() });

	saveSessionData({ session, accessToken });
	location.replace(redirect || route.DEFAULT_AUTHENTICATED_URL);
}

export function getSession(): SessionProps | null {
	const session = getStorageSession();

	if (!session) return null;

	return session;
}

export function getExistingSession(): SessionProps {
	const session = getStorageSession();

	if (!session) {
		 signOut();
     return;
	}

	return session;
}
