import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Landing } from "@/components/ui/landing";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Landing.Page className="flex h-svh w-full flex-col items-center justify-center gap-6 bg-background px-4">
			<Card.Root className="relative flex w-full max-w-3xl flex-col items-center gap-6 overflow-hidden border-border/50 bg-background/50 p-8 py-16 text-center shadow-none backdrop-blur-sm sm:p-12">
				<div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

				<div className="space-y-4">
					<h1 className="bg-linear-to-br from-foreground to-foreground/70 bg-clip-text font-bold text-4xl text-transparent tracking-tighter md:text-6xl lg:text-7xl">
						React Template
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
						A modern, performant, and accessible template for building React applications. Powered by Vite, Tailwind CSS, and TanStack
						Router.
					</p>
				</div>

				<div className="flex flex-col gap-4 sm:flex-row">
					<Link to="/examples/components">
						<Button size="lg" className="gap-2">
							Ver Exemplos
							<ArrowRight className="h-4 w-4" />
						</Button>
					</Link>
					<a target="_blank" rel="noopener noreferrer" href="https://github.com/MarcosLima-1/react-template">
						<Button variant="outline" size="lg" className="gap-2">
							<Github className="h-4 w-4" />
							GitHub
						</Button>
					</a>
				</div>
			</Card.Root>
		</Landing.Page>
	);
}
