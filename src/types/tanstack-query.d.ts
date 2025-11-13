import type { QueryKey } from "@tanstack/react-query";

type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface TanstackMetaTags extends Record<string, unknown> {
	method: methods[];
	title: string;
	desc: string;
	errorMessage?: string;
	successMessage?: string;
	invalidateQueries?: QueryKey[];
	refetchQueries?: QueryKey[];
	removeQueries?: QueryKey[];
	silent?: boolean;
	redirectToOnSuccess?: string;
	redirectToOnError?: string;
}

declare module "@tanstack/react-query" {
	interface Register {
		queryMeta: TanstackMetaTags;
		mutationMeta: TanstackMetaTags;
	}
}
