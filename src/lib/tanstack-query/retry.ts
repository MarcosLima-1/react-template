import { isAxiosError } from "axios";

const NON_RETRYABLE_STATUSES = [403, 401, 400, 404, 500, 0];

export function queryRetryHandler(retryCount: number, error: unknown): boolean {
	if (!isAxiosError(error)) return false;

	const errorStatusCode = error.response?.status ?? 0;
	const isNotRetryableStatus = NON_RETRYABLE_STATUSES.includes(errorStatusCode);

	if (isNotRetryableStatus) return false;
	if (retryCount < 3) return true;

	if (error.code === "ERR_NETWORK") {
		location.replace("/error/server-error");
	}

	return false; // ? apos 3 tentativas ele para.
}
