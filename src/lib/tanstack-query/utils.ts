import type { MutationMeta, QueryMeta } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "@/modules/notification/components/toasts";
import { NON_RETRYABLE_STATUSES } from "@/lib/tanstack-query/retry";



export function handleToastError(error: Error, meta?: QueryMeta | MutationMeta) {
	if (meta?.silent) return;

	if (!isAxiosError(error) || !error.response) {
		toast.error({ title: `Erro desconhecido!!`, description: error.message });
		return;
	}

	const isNotRetryableStatus = NON_RETRYABLE_STATUSES.includes(error.response.status);
	if (isNotRetryableStatus) return;

	const apiErrorMessage = error.response.data.message;
	const errorMessage = meta?.errorMessage ?? apiErrorMessage ?? "Ocorreu um erro inesperado. Tente novamente.";

	toast.error({ title: `Ocorreu um erro no: ${meta?.title}`, description: errorMessage });
}

export function handleToastSuccess(meta?: QueryMeta | MutationMeta) {
	if (meta?.silent) return;

	if (meta?.successMessage) {
		toast.success({ title: "Sucesso!", description: meta.successMessage });
	}
}
