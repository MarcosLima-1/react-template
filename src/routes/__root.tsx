/// <reference types="vite/client" />

import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { DevtoolsWrapper } from "@/components/devtools-wrapper";
import { Footer } from "@/components/footer";
import { NavigationHeader } from "@/components/navegation-header";
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
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/images/icon.svg" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<ToastProvider>
						<div className="w-full">
							<NavigationHeader />
							<main className="flex w-full flex-col items-center">
								<Outlet />
							</main>
							<Footer />
						</div>
						<DevtoolsWrapper />
					</ToastProvider>
				</ThemeProvider>
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
