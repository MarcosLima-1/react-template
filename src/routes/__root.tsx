import { createRootRouteWithContext, HeadContent, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { NavigationHeader } from "@/components/navegation-header";
import type { RouteContext } from "@/types/tanstack-router";

export const Route = createRootRouteWithContext<RouteContext>()({
	head: () => ({
		meta: [
			{ name: "title", content: "React Template" },
			{
				name: "description",
				content: "Um template moderno para aplicações React.",
			},
		],
	}),
	component: RootComponent,
	onCatch(error) {
		return <div>Error {error.message}</div>;
	},
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
		</>
	);
}
