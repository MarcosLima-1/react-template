export function isClientSide() {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
