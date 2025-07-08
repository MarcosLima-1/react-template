import { Link } from "@tanstack/react-router";
import { GhostIcon, HomeIcon } from "lucide-react";

export function NotFound() {
	return (
		<div className="flex h-svh w-full flex-col items-center justify-center gap-3 bg-gray-950 p-4 text-center text-white">
			<GhostIcon className="size-24 text-purple-400" />
			<h1 className="text-4xl font-bold">404 - Página Não Encontrada</h1>
			<p className="max-w-md text-lg text-gray-400">
				A página que você está procurando não existe ou pode ter sido movida para outro universo.
			</p>
			<Link
				to="/"
				className="mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-transform hover:scale-105"
			>
				<HomeIcon size={18} />
				Voltar para a Home
			</Link>
		</div>
	);
}
