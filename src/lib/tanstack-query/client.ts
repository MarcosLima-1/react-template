import { type Mutation, MutationCache, type Query, QueryCache, QueryClient } from "@tanstack/react-query";
import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME, RETRY_DELAY } from "@/core/cache";
import { globalErrorHandler, globalSuccessHandler } from "@/lib/tanstack-query/handlers";
import { queryRetryHandler } from "./retry";


const mutationCache = new MutationCache({
	onError: (error, _, _1, mutation) => globalErrorHandler(error, mutation as Mutation),
	onSuccess: (_, _1, _2, mutation) => globalSuccessHandler(mutation as Mutation),
});

const queryCache = new QueryCache({
	onError: (error, query) => globalErrorHandler(error, query as Query),
	onSuccess: (_, query) => globalSuccessHandler(query as Query),
});

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
	mutationCache,
	queryCache,
});
