import { type Mutation, MutationCache, type Query, QueryCache, QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from "@/core/cache";
import { sendApplicationErrorToDiscord } from "@/utils/send-error-to-discord";

type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface TanstackMetaTags {
	method: methods[];
	desc: string;
	errorMessage: string;
	successMessage?: string;
}

const RETRY_DELAY = 5000;
const NON_RETRYABLE_STATUSES = [403, 404, 429];
const DISCORD_ERROR_WEBHOOK_URL = import.meta.env.DISCORD_ERROR_WEBHOOK;

function queryRetryHandler(_: number, error: unknown): boolean {
	if (isAxiosError(error) && error.response) {
		return !NON_RETRYABLE_STATUSES.includes(error.response.status);
	}
	return true;
}

function handleGlobalError<T extends Query | Mutation>(error: Error, item: T) {
	// ? Display a toast notification for these specific errors.
	if (isAxiosError(error) && error.response) {
		if (error.response.status === 429) {
			toast.error("Hold on! You're making too many requests. Please try again shortly.");
			return;
		}
		if (NON_RETRYABLE_STATUSES.includes(error.response.status)) {
			return;
		}
	}

	const meta = item.meta as TanstackMetaTags | undefined;
	const userName = "User not signed in";

	toast.error(meta?.errorMessage || "An unexpected error occurred. Please try again.");

	const context: Record<string, unknown> = {
		meta: meta,
		user: userName,
	};

	sendApplicationErrorToDiscord({
		error,
		webhookUrl: DISCORD_ERROR_WEBHOOK_URL,
		context,
	});
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
