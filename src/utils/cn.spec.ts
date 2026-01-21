import { describe, expect, it } from "vitest";
import { cn } from "@/utils/cn";

describe("cn", () => {
	it("should merge classes correctly", () => {
		expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
	});

	it("should override conflicting classes", () => {
		expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
	});

	it("should handle conditional classes", () => {
		expect(cn("bg-red-500", { "text-white": true })).toBe("bg-red-500 text-white");
		expect(cn("bg-red-500", { "text-white": false })).toBe("bg-red-500");
	});

	it("should handle array of classes", () => {
		expect(cn(["bg-red-500", "text-white"])).toBe("bg-red-500 text-white");
	});
});
