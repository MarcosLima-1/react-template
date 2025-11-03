import { describe, expect, it } from "vitest";
import { beautifyBytes } from "@/utils/formatters/beautify-bytes";

describe("beautifyBytes", () => {
	it("should return '0 Bytes' for 0 bytes", () => {
		expect(beautifyBytes(0)).toBe("0 Bytes");
	});

	it("should format bytes correctly", () => {
		expect(beautifyBytes(1024)).toBe("1 KB");
	});

	it("should format megabytes correctly", () => {
		expect(beautifyBytes(1048576)).toBe("1 MB");
	});

	it("should format gigabytes correctly", () => {
		expect(beautifyBytes(1073741824)).toBe("1 GB");
	});

	it("should use specified decimals", () => {
		expect(beautifyBytes(1500, 2)).toBe("1.46 KB");
	});
});
