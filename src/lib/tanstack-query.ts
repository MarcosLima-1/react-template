import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from "@/core/cache";
import { sendApplicationErrorToDiscord } from "@/utils/send-error-to-discord";

const DISCORD_ERROR_WEBHOOK_URL = import.meta.env.DISCORD_ERROR_WEBHOOK;

type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export interface TanstackMetaTags {
	method: methods[];
	desc: string;
	errorMessage: string;
	successMessage?: string;
}

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: DEFAULT_STALE_TIME,
			gcTime: DEFAULT_GC_TIME,
			refetchOnReconnect: true,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			retryDelay: 5000,
			retry: (_, error) => {
				if (isAxiosError(error)) {
					if (error.response?.status === 404) return false;
				}

				return true;
			},
		},
	},
	mutationCache: new MutationCache({
		onError: (error, variables, _, mutation) => {
			const meta = mutation.meta as TanstackMetaTags | undefined;
			const userName = "User not signed in";

			sendApplicationErrorToDiscord({
				error: error as Error,
				webhookUrl: DISCORD_ERROR_WEBHOOK_URL,
				context: {
					variables: variables,
					meta: meta,
					user: userName,
				},
			});
			toast.error(meta?.errorMessage || error.message);
		},
	}),
	queryCache: new QueryCache({
		onError: (error, query) => {
			const meta = query.meta as TanstackMetaTags | undefined;
			const userName = "User not signed in";

			sendApplicationErrorToDiscord({
				error: error as Error,
				webhookUrl: DISCORD_ERROR_WEBHOOK_URL,
				context: {
					meta: meta,
					user: userName,
				},
			});
			toast.error(meta?.errorMessage || error.message);
		},
	}),
});
