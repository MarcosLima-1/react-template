export const stringLimiter = (string: string, lengthLimit: number) => {
	if (!string && typeof !string) return;
	if (string.length > lengthLimit) {
		return string.slice(0, lengthLimit) + "...";
	}
	return string;
};
