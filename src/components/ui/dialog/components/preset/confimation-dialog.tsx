import type { ReactNode } from "react";
import { Button } from "@/components/ui/button/button";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/utils/cn";

interface ConfimationDialogProps {
	children?: ReactNode;
	onClickConfirm?: () => void;
	onClickCancel?: () => void;
	confirmButtonVariant?: "primary" | "destructive";
	confirmButtonLabel?: string;
	className?: string;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title: string;
	description?: string;
}

export function ConfimationDialog({
	confirmButtonVariant = "primary",
	confirmButtonLabel = "Confirmar",
	className,
	children,
	onClickCancel,
	onClickConfirm,
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
		<Dialog.presets.basic className={cn("h-[200px] max-w-xl", className)}>
			<Dialog.header>
				<Dialog.title>{title}</Dialog.title>
				{description && <Dialog.description>{description}</Dialog.description>}
			</Dialog.header>
			{children}
			<Dialog.footer>
				<Dialog.trigger asChild>
					<Button onClick={handleCancelClick} variant="outline">
						Cancelar
					</Button>
				</Dialog.trigger>
				<Dialog.trigger asChild>
					<Button variant={confirmButtonVariant} onClick={handleConfirmClick}>
						{confirmButtonLabel}
					</Button>
				</Dialog.trigger>
			</Dialog.footer>
		</Dialog.presets.basic>
	);
}
