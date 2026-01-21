import { describe, expect, it } from "vitest";
import { getRandomNumber } from "@/utils/get-random-number";

describe("getRandomNumber", () => {
	it("should return a number less than the limit", () => {
		const limit = 10;
		const randomNumber = getRandomNumber(limit);
		expect(randomNumber).toBeLessThan(limit);
	});

	it("should return an integer", () => {
		const limit = 10;
		const randomNumber = getRandomNumber(limit);
		expect(Number.isInteger(randomNumber)).toBe(true);
	});
});
