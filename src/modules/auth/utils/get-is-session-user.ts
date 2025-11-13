import { getSession } from "@/modules/auth/utils/auth";

export function getIsSessionUser(userId: string | undefined) {
	if (!userId) return false;
	const session = getSession();

	if (!session) return false;

	return session.user.id === userId;
}
