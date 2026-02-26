import { describe, expect, it, vi } from "vitest";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

const toastSuccess = vi.fn();

vi.mock("@/modules/notification/components/toasts", () => ({
	toast: {
		success: toastSuccess,
	},
}));

const writeText = vi.fn();

Object.defineProperty(globalThis, "navigator", {
	value: {
		clipboard: {
			writeText,
		},
	},
	configurable: true,
});

describe("copyToClipboard", () => {
	it("should call navigator.clipboard.writeText and toast.success", () => {
		const value = "test value";
		const message = "test message";

		copyToClipboard({ value, message });

		expect(writeText).toHaveBeenCalledWith(value);
		expect(toastSuccess).toHaveBeenCalledWith({ title: "Valor Copiado!", description: message });
	});
});
