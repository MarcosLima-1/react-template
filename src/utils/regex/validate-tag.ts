const regex = /^[a-z0-9_-]+$/i;

export function validateTag(tag: string): boolean {
	return regex.test(tag);
}
