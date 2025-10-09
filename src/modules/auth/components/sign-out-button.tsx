import { LogOutIcon } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
	DialogCloseButton,
	DialogFooter,
	DialogHeader,
	DialogProvider,
	DialogSimple,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "@/modules/auth/utils/auth";
import { cn } from "@/utils/cn";

interface SignOutButtonProps extends ButtonProps {
	className?: string;
}

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
	function handleLogout() {
		signOut();
	}

	return (
		<DialogProvider>
			<DialogTrigger asChild>
				<Button
					className={cn("relative h-10 w-full justify-start overflow-hidden text-left [&.active]:border-primary", className)}
					{...props}
				>
					<LogOutIcon className="size-4" /> Sair
				</Button>
			</DialogTrigger>
			<DialogSimple className="h-[200px] max-w-xl">
				<DialogHeader>
					<DialogTitle>Tem certeza que deseja sair?</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<DialogCloseButton asChild>
						<Button variant="outline">Cancelar</Button>
					</DialogCloseButton>
					<DialogCloseButton asChild>
						<Button variant="destructive" onClick={handleLogout}>
							Sair
						</Button>
					</DialogCloseButton>
				</DialogFooter>
			</DialogSimple>
		</DialogProvider>
	);
}
