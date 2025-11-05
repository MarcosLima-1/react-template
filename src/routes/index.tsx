import { createFileRoute } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";
import { Image } from "@/components/misc/image";
import { RoundedIcon } from "@/components/misc/rounded-icon";
import { ShadowBlur } from "@/components/misc/shadow-blur";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-svh w-full items-center justify-center bg-background">
			<div className="relative flex size-11/12 flex-col items-center justify-center rounded-2xl border border-primary/20 bg-card p-8 shadow-2xl shadow-purple-500/10 md:size-4/5">
				<ShadowBlur blur={500} spread={100} className="opacity-40" />
				<RoundedIcon className="mb-6 bg-linear-to-br from-purple-600 to-blue-500 p-4">
					<HomeIcon size={80} />
				</RoundedIcon>
				<h1 className="bg-linear-to-b from-white to-primary bg-clip-text text-center font-bold text-5xl text-transparent md:text-6xl">
					React Template
				</h1>
				<p className="mt-4 text-center text-gray-400 text-lg">Seu ponto de partida para aplicações modernas.</p>
			</div>

			<a
				target="_blank"
				rel="noopener noreferrer"
				aria-label="author"
				href="https://github.com/MarcosLima-1"
				className="fixed bottom-4 left-4 flex items-center gap-2 rounded-full border bg-background p-2"
			>
				<Image alt="author" height={30} width={30} src="/tk.webp" className="rounded-full" /> <p>by @markin</p>
			</a>
		</div>
	);
}
