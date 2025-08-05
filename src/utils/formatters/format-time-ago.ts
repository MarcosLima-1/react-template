import { dayjs } from "@/lib/dayjs";

/**
 * Calcula o tempo relativo desde um timestamp usando Day.js.
 * @param {string | number | Date} timestamp - O timestamp para comparar.
 * @returns {string} - O tempo relativo formatado em português.
 */
export function formatTimeAgo(timestamp: string | number | Date): string {
	const pastDate = dayjs(timestamp);
	const currentDate = dayjs();

	if (pastDate.isAfter(currentDate)) {
		return "agora mesmo";
	}

	return pastDate.fromNow();
}
