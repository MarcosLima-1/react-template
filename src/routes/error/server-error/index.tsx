import { createFileRoute, Link } from "@tanstack/react-router";
import { RefreshCw, ServerIcon as ServerX, Wifi } from "lucide-react";
import z from "zod/v4";
import { GradientBackground } from "@/components/misc/gradient-background";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { route } from "@/core/routes";
import type { FileRouteTypes } from "@/routeTree.gen";

const loginSearchParams = z.object({
	redirect: z.string().optional(),
});
export const Route = createFileRoute("/error/server-error/")({
	component: ServerError,
	validateSearch: loginSearchParams,
});

export default function ServerError() {
	const { redirect } = Route.useSearch();

	const link = (redirect as FileRouteTypes["to"]) || route.DEFAULT_AUTHENTICATED_URL;

	return (
		<div className="relative flex min-h-screen w-full items-center justify-center bg-background p-4">
			<GradientBackground variants="destructive" className="z-0" />
			<div className="z-10 w-full max-w-md">
				<CardHeader className="items-center text-center">
					<div className="mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
						<ServerX className="size-8 text-destructive" />
					</div>
					<CardTitle className="font-semibold text-xl">Servidor em atualização ou Indisponível</CardTitle>
					<CardDescription className="text-muted-foreground">
						Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-center space-x-2 text-muted-foreground text-sm">
						<Wifi className="size-4" />
						<span>Verifique sua conexão</span>
					</div>
					<Button asChild className="w-full" variant="default">
						<Link to={link}>
							<RefreshCw />
							Tentar Novamente
						</Link>
					</Button>
					<div className="text-center">
						<p className="text-muted-foreground text-xs">Se o problema persistir, entre em contato com o suporte</p>
					</div>
				</CardContent>
			</div>
		</div>
	);
}
