import type { QueryClient } from "@tanstack/react-query";
import type { router } from "@/main";
import type { SessionProps } from "@/modules/auth/types/auth";

export interface RouteContext {
	queryClient: QueryClient;
	session: SessionProps | null;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
