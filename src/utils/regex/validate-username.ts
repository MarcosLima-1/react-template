export const USERNAME_REGEXP = /^[a-z0-9_-]+$/;

/**
 * Checks if username is valid
 */
export function validateUsername(input: string) {
	return USERNAME_REGEXP.test(input);
}
