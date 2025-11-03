import { toast } from "sonner";
import { describe, expect, it, vi } from "vitest";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

vi.mock("sonner", () => ({
	toast: {
		success: vi.fn(),
	},
}));

Object.assign(navigator, {
	clipboard: {
		writeText: vi.fn(),
	},
});

describe("copyToClipboard", () => {
	it("should call navigator.clipboard.writeText and toast.success", () => {
		const value = "test value";
		const message = "test message";

		copyToClipboard({ value, message });

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(value);
		expect(toast.success).toHaveBeenCalledWith(message);
	});
});
