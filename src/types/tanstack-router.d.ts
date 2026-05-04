import type { QueryClient } from "@tanstack/react-query";
import type { SessionProps } from "@/modules/auth/types/auth";
import type { getRouter } from "@/router";

export interface RouteContext {
	queryClient: QueryClient;
	session: SessionProps | null;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
