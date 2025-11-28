import { LogOutIcon } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button/button";
import { Dialog } from "@/components/ui/dialog";
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
		<Dialog.provider>
			<Dialog.trigger asChild>
				<Button
					className={cn("relative h-10 w-full justify-start overflow-hidden text-left [&.active]:border-primary", className)}
					{...props}
				>
					<LogOutIcon className="size-4" /> Sair
				</Button>
			</Dialog.trigger>
			<Dialog.presets.basic className="h-[200px] max-w-xl">
				<Dialog.header>
					<Dialog.title>Tem certeza que deseja sair?</Dialog.title>
				</Dialog.header>
				<Dialog.footer>
					<Dialog.close asChild>
						<Button variant="outline">Cancelar</Button>
					</Dialog.close>
					<Dialog.close asChild>
						<Button variant="destructive" onClick={handleLogout}>
							Sair
						</Button>
					</Dialog.close>
				</Dialog.footer>
			</Dialog.presets.basic>
		</Dialog.provider>
	);
}
