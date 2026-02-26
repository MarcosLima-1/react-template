import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { AppLogo } from "@/components/misc/app-logo";
import { Button } from "@/components/ui/button";
import { getUserSessionOptions } from "@/modules/auth/api/get-session-user";
import { ThemeToggle } from "@/modules/theme/components/theme-toggle";

export function NavigationHeader() {
	const { data: session } = useSuspenseQuery(getUserSessionOptions());

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-header-height items-center justify-between px-4">
				<div className="flex items-center gap-6">
					<Link to="/" className="flex items-center gap-2">
						<AppLogo />
					</Link>

					<nav className="hidden items-center gap-6 md:flex">
						<Link
							to="/examples/components"
							className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
							activeProps={{ className: "text-primary" }}
						>
							Componentes
						</Link>
						<Link
							to="/examples/form"
							className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
							activeProps={{ className: "text-primary" }}
						>
							Formulários
						</Link>
						<Link
							to="/examples/notifications"
							className="font-medium text-muted-foreground text-sm transition-colors hover:text-primary"
							activeProps={{ className: "text-primary" }}
						>
							Notificações
						</Link>
					</nav>
				</div>

				<div className="flex items-center gap-3">
					{!session && (
						<>
							<Button variant="ghost" size="sm">
								<Link to="/auth/login">Entrar</Link>
							</Button>
							<Button size="sm">
								<Link to="/auth/register">Cadastro</Link>
							</Button>
						</>
					)}
					{/* {session?.user && (
						<Dialog.provider>
							<DropdownMenu>
								<DropdownMenuTrigger  >
									<Button variant="ghost">
										<Avatar className="size-8" src={session?.user.avatarUrl} fallBackIcon={User2Icon} alt={session?.user.name} />
										<span className="max-sm:hidden">{session.user.name}</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem  >
										<Link to="/">
											<UserIcon />
											Perfil
										</Link>
									</DropdownMenuItem>
									<Dialog.trigger  >
										<DropdownMenuItem variant="destructive">
											<LogOutIcon /> Sair
										</DropdownMenuItem>
									</Dialog.trigger>
								</DropdownMenuContent>
							</DropdownMenu>
							<Dialog.presets.basic className="h-[200px] max-w-xl">
								<Dialog.header>
									<Dialog.title>Tem certeza que deseja sair?</Dialog.title>
								</Dialog.header>
								<Dialog.footer>
									<Dialog.trigger  >
										<Button variant="outline">Cancelar</Button>
									</Dialog.trigger>
									<Dialog.trigger  >
										<Button variant="destructive" onClick={signOut}>
											Sair
										</Button>
									</Dialog.trigger>
								</Dialog.footer>
							</Dialog.presets.basic>
						</Dialog.provider>
					)} */}
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
