import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { LogOutIcon, User2Icon, UserIcon } from "lucide-react";
import { AppLogo } from "@/components/misc/app-logo";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DialogCloseButton,
	DialogFooter,
	DialogHeader,
	DialogProvider,
	DialogSimple,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getUserSessionOptions } from "@/modules/auth/api/get-session-user";
import { signOut } from "@/modules/auth/utils/auth";
import { ThemeToggle } from "@/modules/theme/components/theme-toggle";

export function NavigationHeader() {
	const { data: session } = useSuspenseQuery(getUserSessionOptions());

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-header-height items-center justify-between px-4">
				<Link to="/" className="flex items-center gap-2">
					<AppLogo />
				</Link>

				<div className="flex items-center gap-3">
					{!session && (
						<>
							<Button variant="ghost" size="sm" asChild>
								<Link to="/auth/login">Entrar</Link>
							</Button>
							<Button size="sm" asChild>
								<Link to="/auth/register">Cadastro</Link>
							</Button>
						</>
					)}
					{session?.user && (
						<DialogProvider>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost">
										<Avatar className="size-8" src={session?.user.avatarUrl} fallBackIcon={User2Icon} alt={session?.user.name} />
										<span className="max-sm:hidden">{session.user.name}</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem asChild>
										<Link to="/">
											<UserIcon />
											Perfil
										</Link>
									</DropdownMenuItem>
									<DialogTrigger asChild>
										<DropdownMenuItem variant="destructive">
											<LogOutIcon /> Sair
										</DropdownMenuItem>
									</DialogTrigger>
								</DropdownMenuContent>
							</DropdownMenu>
							<DialogSimple className="h-[200px] max-w-xl">
								<DialogHeader>
									<DialogTitle>Tem certeza que deseja sair?</DialogTitle>
								</DialogHeader>
								<DialogFooter>
									<DialogCloseButton asChild>
										<Button variant="outline">Cancelar</Button>
									</DialogCloseButton>
									<DialogCloseButton asChild>
										<Button variant="destructive" onClick={signOut}>
											Sair
										</Button>
									</DialogCloseButton>
								</DialogFooter>
							</DialogSimple>
						</DialogProvider>
					)}
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
