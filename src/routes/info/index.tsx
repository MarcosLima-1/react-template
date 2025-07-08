import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheckIcon, GitMergeIcon, LayoutGridIcon, WindIcon, WrenchIcon, ZapIcon } from "lucide-react";
import { ShadowBlur } from "@/components/misc/shadow-blur"; // Ajuste o caminho se necessário

export const Route = createFileRoute("/info/")({
	component: RouteComponent,
});

const technologies = [
	{
		category: "Core & Build",
		icon: <ZapIcon className="size-6 text-yellow-400" />,
		items: [
			{ name: "React 19.1", description: "A mais recente versão da biblioteca para interfaces." },
			{ name: "Vite 7", description: "Build tool moderna e extremamente rápida." },
			{ name: "TypeScript", description: "JavaScript com tipagem estática para maior segurança." },
		],
	},
	{
		category: "Estilização & UI",
		icon: <WindIcon className="size-6 text-cyan-400" />,
		items: [
			{ name: "Tailwind CSS 4.1", description: "Framework CSS utility-first para designs rápidos." },
			{ name: "Lucide React", description: "Biblioteca de ícones SVG, bonita e customizável." },
			{ name: "Sonner", description: "Para feedbacks e notificações (toasts) elegantes." },
		],
	},
	{
		category: "Routing & Data Fetching",
		icon: <GitMergeIcon className="size-6 text-emerald-400" />,
		items: [
			{ name: "TanStack Router", description: "Roteamento type-safe e poderoso." },
			{ name: "TanStack Query", description: "Gerenciamento de estado assíncrono (server-state)." },
			{ name: "Axios", description: "Cliente HTTP robusto para requisições a APIs." },
		],
	},
	{
		category: "Formulários & Validação",
		icon: <ClipboardCheckIcon className="size-6 text-rose-400" />,
		items: [
			{ name: "TanStack Form", description: "Gerenciamento de formulários performático e type-safe." },
			{ name: "Zod", description: "Validação de esquemas com inferência de tipos em TypeScript." },
		],
	},
	{
		category: "Tooling & Qualidade",
		icon: <WrenchIcon className="size-6 text-orange-400" />,
		items: [
			{ name: "Biome", description: "Formatter e Linter unificado para código limpo e consistente." },
			{ name: "Rollup Visualizer", description: "Analisa o tamanho dos bundles gerados." },
		],
	},
	{
		category: "Utilitários",
		icon: <LayoutGridIcon className="size-6 text-indigo-400" />,
		items: [
			{ name: "Day.js", description: "Manipulação de datas de forma simples e imutável." },
			{ name: "js-cookie", description: "API simples para interagir com cookies." },
		],
	},
];

function RouteComponent() {
	return (
		<div className="flex w-full justify-center bg-gray-950 text-white">
			<div className="relative my-16 w-11/12 max-w-4xl rounded-2xl border border-purple-500/20 bg-gray-900/60 p-8 shadow-2xl shadow-purple-500/10">
				<ShadowBlur blur={400} spread={80} className="opacity-30" />

				<div className="text-center mb-10">
					<h1 className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-4xl md:text-5xl font-bold text-transparent">
						Tech Stack
					</h1>
					<p className="mt-3 text-lg text-gray-400">As tecnologias que impulsionam este template.</p>
				</div>

				<div className="grid gap-8 md:grid-cols-2">
					{technologies.map((techCategory) => (
						<div key={techCategory.category} className="flex flex-col rounded-lg border border-gray-700/50 bg-gray-800/40 p-5">
							<div className="flex items-center gap-3 mb-4">
								{techCategory.icon}
								<h2 className="text-xl font-semibold text-white">{techCategory.category}</h2>
							</div>
							<ul className="space-y-3">
								{techCategory.items.map((item) => (
									<li key={item.name}>
										<h3 className="font-medium text-gray-200">{item.name}</h3>
										<p className="text-sm text-gray-400">{item.description}</p>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
