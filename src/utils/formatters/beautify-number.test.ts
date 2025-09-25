import { describe, expect, it } from "vitest";
import { beautifyNumber } from "@/utils/formatters/beautify-number";

describe("Beautify number", () => {
	it("1000 to 1k", () => {
		expect(beautifyNumber(1000)).toBe("1K");
	});

	it("1000000 to 1m", () => {
		expect(beautifyNumber(1000000)).toBe("1M");
	});
});
