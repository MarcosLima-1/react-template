import { Slot } from "@radix-ui/react-slot";
import type { ReactNode } from "react";
import { useDialogContext } from "@/components/ui/dialog/context/dialog-context";

interface DialogTriggerProps {
	children: ReactNode;
	asChild?: boolean;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

/**
 * Componente que atua como gatilho para abrir/fechar o diálogo.
 * Pode ser um botão ou qualquer outro elemento se `asChild` for true.
 */
export function DialogTrigger({ children, disabled, asChild, onClick }: DialogTriggerProps) {
	const { toggleDialog } = useDialogContext();
	const Element = asChild ? Slot : "button";

	function handleClick() {
		if (disabled) return;
		onClick?.();
		toggleDialog();
	}

	return (
		<Element disabled={asChild ? false : disabled} onClick={handleClick}>
			{children}
		</Element>
	);
}
