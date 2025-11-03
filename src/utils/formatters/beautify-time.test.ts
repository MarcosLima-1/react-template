import { describe, expect, it } from "vitest";
import { beautifyTime } from "@/utils/formatters/beautify-time";

describe("beautifyTime", () => {
	it("should format time correctly", () => {
		expect(beautifyTime(3661)).toBe("01:01:01");
	});

	it("should hide hours if zero and hideHoursIfZero is true", () => {
		expect(beautifyTime(61)).toBe("01:01");
	});

	it("should show hours if zero and hideHoursIfZero is false", () => {
		expect(beautifyTime(61, { hideHoursIfZero: false })).toBe("00:01:01");
	});

	it("should throw an error for negative time", () => {
		expect(() => beautifyTime(-1)).toThrow();
	});
});
