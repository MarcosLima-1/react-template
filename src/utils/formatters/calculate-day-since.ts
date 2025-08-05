import { dayjs } from "@/lib/dayjs";

type CalculateDaysSinceProps = string | number | Date;

/**
 * Calculates the number of days between a given timestamp and the current date.
 * Accepts timestamps in various formats (string, number, or Date object).
 * @param {string | number | Date} timestamp - The timestamp to compare against the current date.
 * @returns {number} - The number of days since the provided timestamp.
 * @throws {Error} - If the input timestamp is invalid.
 */

export function calculateDaysSince(timestamp: CalculateDaysSinceProps): number {
	return Math.ceil(Math.abs(dayjs(timestamp).diff(new Date(), "days", true)));
}
