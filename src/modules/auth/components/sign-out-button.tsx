import { Button, type ButtonProps } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { signOut } from "@/modules/auth/utils/auth";
import { LogOutIcon } from "lucide-react";
import { cn } from "tailwind-variants";

interface SignOutButtonProps extends ButtonProps {
	className?: string;
}

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
	function handleLogout() {
		signOut();
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button
					className={cn("relative h-10 w-full justify-start overflow-hidden text-left [&.active]:border-primary", className)}
					{...props}
				>
					<LogOutIcon className="size-4" /> Sair
				</Button>
			</Dialog.Trigger>
			<Dialog.Content className="h-50 max-w-xl">
				<Dialog.Header>
					<Dialog.Title>Tem certeza que deseja sair?</Dialog.Title>
				</Dialog.Header>
				<Dialog.Footer>
					<Dialog.Close render={<Button variant="outline">Cancelar</Button>}>

					</Dialog.Close>
					<Dialog.Close render={<Button variant="destructive" onClick={handleLogout}>
							Sair
						</Button>}>
					</Dialog.Close>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
}
