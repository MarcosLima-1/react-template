import { describe, expect, it, vi } from "vitest";
import { calculateDaysSince } from "@/utils/formatters/calculate-day-since";

describe("calculateDaysSince", () => {
	it("should return the correct number of days since a given date", () => {
		const date = new Date(2023, 10, 10);
		vi.setSystemTime(new Date(2023, 10, 20));
		expect(calculateDaysSince(date)).toBe(10);
	});

	it("should handle string dates", () => {
		const date = "2023-11-10";
		vi.setSystemTime(new Date(2023, 10, 20));
		expect(calculateDaysSince(date)).toBe(10);
	});

	it("should handle number (timestamp) dates", () => {
		const date = new Date(2023, 10, 10).getTime();
		vi.setSystemTime(new Date(2023, 10, 20));
		expect(calculateDaysSince(date)).toBe(10);
	});

	it("should return 0 for the same day", () => {
		const date = new Date();
		expect(calculateDaysSince(date)).toBe(0);
	});
});
