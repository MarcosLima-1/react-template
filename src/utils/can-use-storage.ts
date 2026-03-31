export function canUseStorage() {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
