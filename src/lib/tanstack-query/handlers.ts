import type { Mutation, Query } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack-query/client";
import { getSession } from "@/modules/auth/utils/auth";
import { handleToastError, handleToastSuccess } from "./utils";

export const globalErrorHandler = (error: Error, item: Query | Mutation) => {
	const meta = item.meta;
	const session = getSession();
	const userName = session?.user?.name ?? "Usuário não identificado";

	handleToastError(error, meta);

	const context: Record<string, unknown> = {
		meta: meta,
		user: userName,
	};

	// console.error(context);

	if (meta?.redirectToOnError) {
		location.replace(meta.redirectToOnError);
	}
};

export const globalSuccessHandler = (item: Query | Mutation) => {
	const meta = item.meta;

	handleToastSuccess(meta);

	if (meta?.refetchQueries && meta.refetchQueries.length > 0) {
		meta.refetchQueries.forEach((element) => {
			queryClient.refetchQueries({ queryKey: element, exact: true });
		});
	}

	if (meta?.invalidateQueries && meta.invalidateQueries.length > 0) {
		meta.invalidateQueries.forEach((queryKey) => {
			queryClient.invalidateQueries({ queryKey, exact: true });
		});
	}

	if (meta?.removeQueries && meta.removeQueries.length > 0) {
		meta.removeQueries.forEach((queryKey) => {
			queryClient.removeQueries({ queryKey, exact: true });
		});
	}

	if (meta?.redirectToOnSuccess) {
		location.replace(meta.redirectToOnSuccess);
	}
};
