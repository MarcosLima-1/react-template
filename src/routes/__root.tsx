/// <reference types="vite/client" />

import { GoogleOAuthProvider } from "@react-oauth/google";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { scan } from "react-scan";
import { Footer } from "@/components/footer";
import { NavigationHeader } from "@/components/navegation-header";
import { env } from "@/lib/env";
import { queryClient } from "@/lib/tanstack-query/client";
import { ToastProvider } from "@/modules/notification/components/toast-provider";
import { ThemeProvider } from "@/modules/theme/context/theme-provider";
import type { RouteContext } from "@/types/tanstack-router";
import appCss from "../styles/global.css?url";

export const Route = createRootRouteWithContext<RouteContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ name: "title", content: "React Template" },
			{
				name: "description",
				content: "Um template moderno para aplicações React.",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
});

function RootComponent() {
	scan({
		enabled: true,
	});

	return (
		<RootDocument>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<ToastProvider>
						<GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
							<div className="w-full">
								<NavigationHeader />
								<main className="flex w-full flex-col items-center">
									<Outlet />
								</main>
								<Footer />
							</div>
						</GoogleOAuthProvider>
					</ToastProvider>
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
								render: <TanStackRouterDevtoolsPanel />,
							},
							{
								name: "TanStack Form",
								render: <FormDevtoolsPanel />,
							},
						]}
					/>
				)}
			</QueryClientProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="pt">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
