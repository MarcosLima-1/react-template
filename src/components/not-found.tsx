import { Link } from "@tanstack/react-router";
import { GhostIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
	return (
		<div className="flex h-svh w-full flex-col items-center justify-center gap-3 p-4 text-center">
			<GhostIcon className="size-24 text-primary" />
			<h1 className="font-bold text-4xl">404 - Página Não Encontrada</h1>
			<p className="max-w-md text-lg text-muted-foreground">
				A página que você está procurando não existe ou pode ter sido movida para outro universo.
			</p>
			<Button variant="outline" asChild size="lg">
				<Link to="/">
					<HomeIcon size={18} />
					Voltar para a Home
				</Link>
			</Button>
		</div>
	);
}
