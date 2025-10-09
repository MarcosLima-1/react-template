import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./button.tsx";
import { DialogCloseButton, DialogDescription, DialogFooter, DialogHeader, DialogProvider, DialogSimple, DialogTitle } from "./dialog.tsx";

interface ConfimationDialogProps {
	children: ReactNode;
	onClickConfirm?: () => void;
	onClickCancel?: () => void;
	confirmButtonVariant?: "default" | "destructive";
	confirmButtonLabel?: string;
	className?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title: string;
	description?: string;
}

export function ConfimationDialog({
	children,
	confirmButtonVariant = "default",
	confirmButtonLabel = "Confirmar",
	className,
	onClickCancel,
	onClickConfirm,
	onOpenChange,
	open,
	description,
	title,
}: ConfimationDialogProps) {
	function handleCancelClick() {
		onClickCancel?.();
	}
	function handleConfirmClick() {
		onClickConfirm?.();
	}
	return (
		<DialogProvider isOpen={open} onOpenChange={onOpenChange}>
			{children}
			<DialogSimple hideCloseButton className={cn("h-[200px] max-w-xl", className)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				<DialogFooter>
					<DialogCloseButton asChild>
						<Button onClick={handleCancelClick} variant="outline">
							Cancelar
						</Button>
					</DialogCloseButton>
					<DialogCloseButton asChild>
						<Button variant={confirmButtonVariant} onClick={handleConfirmClick}>
							{confirmButtonLabel}
						</Button>
					</DialogCloseButton>
				</DialogFooter>
			</DialogSimple>
		</DialogProvider>
	);
}
