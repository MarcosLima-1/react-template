import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@/components/misc/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-svh w-full items-center justify-center bg-background">
			<Card.Root className="container">
				<h1 className="bg-linear-to-b text-center font-bold text-5xl text-primary md:text-6xl">React Template</h1>
				<Link to="/examples/components">
					<Button variant="destructive">Entrar</Button>
				</Link>
			</Card.Root>
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
