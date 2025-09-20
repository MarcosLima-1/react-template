import { type Mutation, MutationCache, type Query, QueryCache, QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from "@/core/cache";
import type { TanstackMetaTags } from "@/types/tanstack-meta";

const RETRY_DELAY = 5000;
const NON_RETRYABLE_STATUSES = [403, 404, 429, 500];

function queryRetryHandler(retryCount: number, error: unknown): boolean {
	if (!isAxiosError(error)) return false;

	const errorStatusCode = error.status;
	const isNotRetryableStatus = NON_RETRYABLE_STATUSES.includes(errorStatusCode ?? 0);

	if (error.response && isNotRetryableStatus) {
		return false;
	}

	if (retryCount >= 3) {
		if (error.code === "ERR_NETWORK") {
			location.replace("/error/server-error");
			return false;
		}
		if (error.status === 401) {
			return false;
		}
		return false;
	}

	return true;
}

function handleGlobalError<T extends Query | Mutation>(error: Error, item: T) {
	const meta = item.meta as TanstackMetaTags | undefined;
	const userName =  "User not signed in";

	handleToastError(error, meta);

	const context: Record<string, unknown> = {
		meta: meta,
		user: userName,
	};

	// sendApplicationErrorToDiscord({
	// 	error,
	// 	webhookUrl: DISCORD_ERROR_WEBHOOK_URL,
	// 	context,
	// });
}

function handleToastError(error: Error, meta?: TanstackMetaTags) {
	let errorMessage = meta?.errorMessage ?? "Ocorreu um erro inesperado. Tente novamente.";

	if (isAxiosError(error) && error.response) {
		const isNotRetryableStatus = NON_RETRYABLE_STATUSES.includes(error.response.status);
		const errorStatusCode = error.response.status;

		if (errorStatusCode === 429) {
			toast.error("Calma lá! Você está fazendo muitas requisições. Tente de novo em breve.");
			return;
		}
		if (isNotRetryableStatus) {
			return;
		}
	}

	toast.error(errorMessage);
}

function handleGlobalSuccess<T extends Query | Mutation>(item: T) {
	const meta = item.meta as TanstackMetaTags | undefined;
	if (meta?.successMessage) {
		toast.success(meta.successMessage);
	}
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: DEFAULT_STALE_TIME,
			gcTime: DEFAULT_GC_TIME,
			refetchOnReconnect: true,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			retryDelay: RETRY_DELAY,
			retry: queryRetryHandler,
		},
	},
	mutationCache: new MutationCache({
		onError: (error, _, _1, mutation) => handleGlobalError(error, mutation as Mutation),
		onSuccess: (_, _1, _2, mutation) => handleGlobalSuccess(mutation as Mutation),
	}),
	queryCache: new QueryCache({
		onError: (error, query) => handleGlobalError(error, query as Query),
		onSuccess: (_, query) => handleGlobalSuccess(query as Query),
	}),
});
