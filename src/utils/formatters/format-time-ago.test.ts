import { describe, expect, it, vi } from "vitest";
import { formatTimeAgo } from "@/utils/formatters/format-time-ago";

describe("formatTimeAgo", () => {
	it("should return 'agora mesmo' for a future date", () => {
		const futureDate = new Date();
		futureDate.setSeconds(futureDate.getSeconds() + 10);
		expect(formatTimeAgo(futureDate)).toBe("agora mesmo");
	});

	it("should return 'há um minuto' for a date one minute ago", () => {
		const date = new Date();
		date.setMinutes(date.getMinutes() - 1);
		vi.setSystemTime(new Date());
		expect(formatTimeAgo(date)).toBe("há um minuto");
	});

	it("should return 'há uma hora' for a date one hour ago", () => {
		const date = new Date();
		date.setHours(date.getHours() - 1);
		vi.setSystemTime(new Date());
		expect(formatTimeAgo(date)).toBe("há uma hora");
	});

	it("should return 'há um dia' for a date one day ago", () => {
		const date = new Date();
		date.setDate(date.getDate() - 1);
		vi.setSystemTime(new Date());
		expect(formatTimeAgo(date)).toBe("há um dia");
	});
});
