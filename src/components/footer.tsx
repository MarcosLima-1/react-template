import { Link } from "@tanstack/react-router";
import { AppLogo } from "@/components/misc/app-logo";

export function Footer() {
	return (
		<footer className="w-full border-border border-t px-4 py-12">
			<div className="container mx-auto">
				<div className="grid gap-8 md:grid-cols-4">
					<div className="md:col-span-2">
						<Link to="/" className="mb-4 flex items-center gap-2">
							<AppLogo />
						</Link>
						<p className="max-w-md text-muted-foreground text-sm leading-relaxed">A maneira mais fácil de iniciar um projeto react.</p>
					</div>

					<div>
						<h3 className="mb-3 font-semibold">Informações</h3>
						<ul className="space-y-2 text-muted-foreground text-sm">
							<li>
								<Link to="/policies/privacy-policy" className="transition-colors hover:text-foreground">
									Políticas de Privacidade
								</Link>
							</li>
							<li>
								<Link to="/policies/terms-of-use" className="transition-colors hover:text-foreground">
									Termos de uso
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 border-border border-t pt-8 text-center text-muted-foreground text-sm">
					<p>© 2025 react template. Todos os direitos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
