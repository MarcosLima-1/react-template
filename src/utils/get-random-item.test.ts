import { describe, expect, it } from "vitest";
import { getRandomItem } from "@/utils/get-random-item";

describe("getRandomItem", () => {
	it("should return an item from the array", () => {
		const array = [1, 2, 3, 4, 5];
		const randomItem = getRandomItem(array);
		expect(array).toContain(randomItem);
	});

	it("should return undefined for an empty array", () => {
		const array: unknown[] = [];
		const randomItem = getRandomItem(array);
		expect(randomItem).toBeUndefined();
	});
});
