import type { HTMLAttributes } from "react";
import { useDialogContext } from "@/components/ui/dialog/context/dialog-context";
import { cn } from "@/utils/cn";

export interface DialogOverlayProps extends HTMLAttributes<HTMLButtonElement> {
	onInteractOverlay?: () => void;
}

/**
 * Componente de overlay (fundo escuro) do diálogo.
 * O clique no overlay fecha o diálogo.
 */
export function DialogOverlay({ className, onInteractOverlay, ...props }: DialogOverlayProps) {
	const { isDialogOpen, handleChangeDialogState } = useDialogContext();

	if (!isDialogOpen) return null;

	function handleOverlayClick() {
		onInteractOverlay?.();
		handleChangeDialogState(false);
	}

	return (
		<button
			type="button"
			data-slot="dialog-overlay"
			data-state={isDialogOpen}
			onClick={handleOverlayClick}
			className={cn("size-full bg-black/50", className)}
			{...props}
		/>
	);
}
