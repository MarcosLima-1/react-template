import { createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { queryClient } from "@/lib/tanstack-query";
import "./global.css";
import { ErrorDisplay } from "@/components/error-display";
import { NotFound } from "@/components/not-found";
import { SplashScreen } from "@/components/splash-screen";
import { routeTree } from "@/routeTree.gen";
import { ThemeProvider } from "./modules/theme/context/theme-provider";

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const router = createRouter({
	routeTree,
	defaultViewTransition: true,
	defaultErrorComponent: ({ error }) => <ErrorDisplay error={error} />,
	defaultNotFoundComponent: () => <NotFound />,
	defaultPendingComponent: () => <SplashScreen />,
	context: {
		queryClient,
	},
});

const rootContainer = document.getElementById("root");

if (!rootContainer) {
	throw new Error("Missing #root container");
}

createRoot(rootContainer).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
			<TanStackRouterDevtools position="bottom-left" router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
