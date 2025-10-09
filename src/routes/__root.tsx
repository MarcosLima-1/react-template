import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/modules/footer/footer";
import { NavigationHeader } from "@/modules/header/navegation-header";

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
	return (
		<>
			<HeadContent />
			<div className="w-full">
				<NavigationHeader />
				<main className="flex w-full flex-col items-center">
					<Outlet />
				</main>
				<Footer />
			</div>
			<Toaster position="bottom-left" richColors duration={5000} />
		</>
	);
}
