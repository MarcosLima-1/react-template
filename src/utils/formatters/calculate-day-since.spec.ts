import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculateDaysSince } from "@/utils/formatters/calculate-day-since";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

describe("calculateDaysSince", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should return the correct number of days since a given date", () => {
		const date = new Date(Date.now() - 10 * DAY_IN_MS);
		expect(calculateDaysSince(date)).toBe(10);
	});

	it("should handle string dates", () => {
		const date = new Date(Date.now() - 10 * DAY_IN_MS).toISOString();
		expect(calculateDaysSince(date)).toBe(10);
	});

	it("should handle number (timestamp) dates", () => {
		const date = Date.now() - 10 * DAY_IN_MS;
		expect(calculateDaysSince(date)).toBe(10);
	});

	it("should return 0 for the same day", () => {
		const date = new Date();
		expect(calculateDaysSince(date)).toBe(0);
	});
});
