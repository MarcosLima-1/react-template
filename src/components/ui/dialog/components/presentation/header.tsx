import type { HTMLAttributes } from "react";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/utils/cn";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
	hideCloseButton?: boolean;
}

/**
 * Componente para o cabeçalho do diálogo.
 */
export function Header({ className, children, hideCloseButton, ...props }: HeaderProps) {
	return (
		<div className={cn("mb-4 grid grid-cols-[1fr_auto] text-center sm:text-left", className)} {...props}>
			<div className="flex flex-col space-y-1.5">{children}</div>
			{!hideCloseButton && <Dialog.close />}
		</div>
	);
}
