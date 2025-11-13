export function stringToDeterministicNumber(inputString: string, min: number, max: number): number {
	// Simple hash function (FNV-1a hash for strings)
	let hash = 2166136261; // 32-bit FNV-1a offset basis
	for (let i = 0; i < inputString.length; i++) {
		hash ^= inputString.charCodeAt(i);
		hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
	}

	// Ensure hash is positive
	hash = hash >>> 0; // Unsigned right shift to ensure positive 32-bit integer

	// Map the hash to the desired range
	const range = max - min + 1;
	const result = (hash % range) + min;

	return result;
}
