import { describe, expect, it, type Mock, vi } from "vitest";
import { queryClient } from "@/lib/tanstack-query";
import { updateInfiniteQueryItem } from "@/utils/infinite-data/update-infinite-query";

vi.mock("@/lib/tanstack-query", () => ({
	queryClient: {
		setQueriesData: vi.fn(),
	},
}));

describe("updateInfiniteQueryItem", () => {
	it("should call queryClient.setQueriesData with the correct updater function", () => {
		const queryKey = ["test"];
		const updater = vi.fn();

		updateInfiniteQueryItem({ queryKey, updater });

		expect(queryClient.setQueriesData).toHaveBeenCalledWith({ queryKey, exact: false }, expect.any(Function));

		const setQueriesDataCallback = (queryClient.setQueriesData as Mock).mock.calls[0][1];
		const oldData = {
			pages: [{ id: 1, value: "old" }],
			pageParams: [1],
		};

		const newData = setQueriesDataCallback(oldData);

		expect(newData.pages[0].id).toBe(1);
	});
});
