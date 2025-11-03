import { describe, expect, it, type Mock, vi } from "vitest";
import { queryClient } from "@/lib/tanstack-query";
import { updateQueryItem } from "@/utils/infinite-data/update-query";

vi.mock("@/lib/tanstack-query", () => ({
	queryClient: {
		setQueriesData: vi.fn(),
	},
}));

describe("updateQueryItem", () => {
	it("should call queryClient.setQueriesData with the correct updater function", () => {
		const queryKey = ["test"];
		const updater = vi.fn();

		updateQueryItem({ queryKey, updater });

		expect(queryClient.setQueriesData).toHaveBeenCalledWith({ queryKey, exact: false }, expect.any(Function));

		const setQueriesDataCallback = (queryClient.setQueriesData as Mock).mock.calls[0][1];
		const oldData = { id: 1, value: "old" };

		const newData = setQueriesDataCallback(oldData);

		expect(newData.id).toBe(1);
	});
});
