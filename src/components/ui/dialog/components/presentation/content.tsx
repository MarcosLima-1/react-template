import { type HTMLAttributes, useRef } from "react";
import { useDialogContext } from "@/components/ui/dialog/context/dialog-context";
import { useKeypress } from "@/hooks/use-key-press";
import { cn } from "@/utils/cn";

/**
 * Componente para o conteúdo principal do diálogo.
 * Contém a caixa modal que aparece sobre o overlay.
 */
export function DialogContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const { dialogState, handleChangeDialogState } = useDialogContext();

	useKeypress({
		combo: ["escape"],
		callback: () => {
			handleChangeDialogState(false);
		},
		target: dialogRef.current,
	});

	return (
		<div
			role="dialog"
			ref={dialogRef}
			tabIndex={-1}
			data-slot="dialog-content"
			data-state={dialogState}
			className={cn(
				"-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-50 flex w-full max-w-2xl flex-col gap-4 rounded-md border bg-background p-4 shadow-lg max-md:max-w-[95%]",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
