import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "@/lib/tanstack-query";
import "./global.css";
import "@/lib/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { isAxiosError } from "axios";
import { LockKeyholeIcon, SearchXIcon } from "lucide-react";
import { scan } from "react-scan";
import { GenericError } from "@/components/generic-error";
import { NotFound } from "@/components/not-found";
import { SplashScreen } from "@/components/splash-screen";
import { UnavailableContent } from "@/components/unavailable-content";
import { env } from "@/lib/env";
import { setupAuthRequestInterceptor } from "@/modules/auth/middlewares/auth-interceptors";
import { routeTree } from "@/routeTree.gen";
import { ThemeProvider } from "./modules/theme/context/theme-provider";

scan({
	enabled: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const router = createRouter({
	routeTree,
	defaultErrorComponent: ({ error }) => {
		if (isAxiosError(error)) {
			if (error.response?.status === 404) {
				return <UnavailableContent icon={SearchXIcon} title="Conteudo não encontrado" />;
			}
			if (error.response?.status === 403) {
				return <UnavailableContent icon={LockKeyholeIcon} title="Você não tem permissão para acessar esse conteúdo" />;
			}
			if (error.response?.status === 400) {
				return <UnavailableContent icon={SearchXIcon} title="Parametros inválidos!" />;
			}
		}
		return <GenericError error={error} />;
	},
	defaultNotFoundComponent: () => <NotFound />,
	defaultPendingComponent: () => <SplashScreen />,
	defaultPreload: false,
	defaultViewTransition: true,
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
				<GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
					<RouterProvider router={router} />
				</GoogleOAuthProvider>
			</ThemeProvider>
			{env.VITE_DEV_MODE && (
				<TanStackDevtools
					plugins={[
						{
							name: "Tanstack Query",
							render: <ReactQueryDevtoolsPanel />,
						},
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel router={router} />,
						},
					]}
				/>
			)}
		</QueryClientProvider>
	</StrictMode>,
);
setupAuthRequestInterceptor();
