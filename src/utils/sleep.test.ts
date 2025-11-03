import { describe, expect, it, vi } from "vitest";
import { sleep } from "@/utils/sleep";

vi.useFakeTimers();

describe("sleep", () => {
	it("should resolve after the specified time", async () => {
		const sleepTime = 1000;
		const promise = sleep(sleepTime);

		vi.advanceTimersByTime(sleepTime);

		await expect(promise).resolves.toBeUndefined();
	});
});
