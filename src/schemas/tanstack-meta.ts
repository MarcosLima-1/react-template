import type { QueryKey } from "@tanstack/react-query";

type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface TanstackMetaTags {
	method: methods;
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
