import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeIcon, RocketIcon } from "lucide-react";
import { Image } from "@/components/misc/Image";
import { ShadowBlur } from "@/components/misc/shadow-blur";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-svh w-full items-center justify-center bg-gray-950 text-white">
			<div className="relative flex size-11/12 flex-col items-center justify-center rounded-2xl border border-purple-500/20 bg-gray-900/60 p-8 shadow-2xl shadow-purple-500/10 md:size-4/5">
				<ShadowBlur blur={500} spread={100} className="opacity-40" />

				<div className="mb-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 p-4">
					<HomeIcon size={80} className="text-white" />
				</div>

				<h1 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-center font-bold text-5xl text-transparent md:text-6xl">
					React Template
				</h1>

				<p className="mt-4 text-center text-gray-400 text-lg">Seu ponto de partida para aplicações modernas.</p>

				<Link
					to="/info"
					className="mt-8 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition-transform hover:scale-105"
				>
					<RocketIcon size={18} />
					Mais Informações
				</Link>
			</div>
			<a
				target="_blank"
				rel="noopener noreferrer"
				aria-label="author"
				href="https://github.com/MarcosLima-1"
				className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-purple-500/20 p-4"
			>
				<Image alt="author" height={30} width={30} src="/tk.webp" className="rounded-full" /> <p>by @markin</p>
			</a>
		</div>
	);
}
