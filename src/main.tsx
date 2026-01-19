import "@/lib/sentry-sdk";
import * as Sentry from "@sentry/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import "@/lib/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { isAxiosError } from "axios";
import { LockKeyholeIcon, SearchXIcon } from "lucide-react";
import { GenericError } from "@/components/generic-error";
import { PageNotFound } from "@/components/page-not-found";
import { SplashScreen } from "@/components/splash-screen";
import { UnavailableContent } from "@/components/unavailable-content";
import { env } from "@/lib/env";
import { queryClient } from "@/lib/tanstack-query/client";
import { setupAuthRequestInterceptor, setupAuthResponseInterceptor } from "@/modules/auth/middlewares/auth-interceptors";
import { getSession } from "@/modules/auth/utils/auth";
import { routeTree } from "@/types/routeTree.generated";
import { ThemeProvider } from "./modules/theme/context/theme-provider";

const session = getSession();

export const router = createRouter({
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
	defaultNotFoundComponent: () => <PageNotFound />,
	defaultPendingComponent: () => <SplashScreen />,
	defaultPreload: false,
	defaultViewTransition: true,
	context: {
		queryClient,
		session,
	},
});

const rootContainer = document.getElementById("root");

if (!rootContainer) {
	throw new Error("Missing #root container");
}

const root = createRoot(rootContainer, {
	// Callback called when an error is thrown and not caught by an ErrorBoundary.
	onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
		console.warn("Uncaught error", error, errorInfo.componentStack);
	}),
	// Callback called when React catches an error in an ErrorBoundary.
	onCaughtError: Sentry.reactErrorHandler(),
	// Callback called when React automatically recovers from errors.
	onRecoverableError: Sentry.reactErrorHandler(),
});

root.render(
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
						{
							name: "TanStack Form",
							render: <FormDevtoolsPanel />,
						},
					]}
				/>
			)}
		</QueryClientProvider>
	</StrictMode>,
);

setupAuthRequestInterceptor();
setupAuthResponseInterceptor();

if (env.VITE_DEV_MODE) {
	import("react-scan").then(({ scan }) => {
		scan({
			enabled: true,
		});
	});
}
