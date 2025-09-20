import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { checkEnv } from "@/lib/envs";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
	head: () => ({
		meta: [
			{ name: "title", content: "React Template" },
			{ name: "description", content: "Um template moderno para aplicações React." },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	checkEnv();
	return (
		<>
			<HeadContent />
			<Outlet />
			<Toaster position="bottom-left" richColors duration={5000} />
		</>
	);
}
