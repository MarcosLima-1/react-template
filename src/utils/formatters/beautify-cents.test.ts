import { describe, expect, it } from "vitest";
import { beautifyCents } from "@/utils/formatters/beautify-cents";

describe("beautifyCents", () => {
	it("should format cents to BRL currency correctly", () => {
		// Note: The output of Intl.NumberFormat can vary slightly based on the Node.js version and ICU data.
		// This test is based on a common representation.
		expect(beautifyCents(10000)).toBe("R$\u00a0100,00");
	});

	it("should handle zero cents", () => {
		expect(beautifyCents(0)).toBe("R$\u00a00,00");
	});

	it("should handle amounts less than 1 real", () => {
		expect(beautifyCents(50)).toBe("R$\u00a00,50");
	});
});
