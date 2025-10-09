import { queryOptions } from "@tanstack/react-query";
import type { SessionProps } from "@/modules/auth/types/auth";
import { getSession } from "@/modules/auth/utils/auth";

function getUserSession(): SessionProps | null {
	const session = getSession();
	return session;
}

export function getUserSessionOptions() {
	return queryOptions({
		queryKey: ["session"],
		queryFn: getUserSession,
	});
}
