type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface TanstackMetaTags {
	method: methods[];
	desc: string;
	errorMessage: string;
	successMessage?: string;
  invalidateQueries?: unknown[]
}
