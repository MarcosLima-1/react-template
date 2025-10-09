import type { FileRouteTypes } from "@/routeTree.gen";

export const route: Record<string, FileRouteTypes["to"]> = {
	LOGIN_URL: "/auth/login",
	REGISTER_URL: "/auth/register",
	LOGOUT_URL: "/",
	DEFAULT_AUTHENTICATED_URL: "/",
};
