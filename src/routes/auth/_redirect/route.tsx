import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { route } from "@/core/routes";
import { getSession } from "@/modules/auth/utils/auth";

export const Route = createFileRoute("/auth/_redirect")({
	component: RouteComponent,
	loader: () => {
		if (typeof window === "undefined") return;

		const session = getSession();
		if (session) {
			redirect({
				to: route.DEFAULT_AUTHENTICATED_URL,
				throw: true,
			});
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
