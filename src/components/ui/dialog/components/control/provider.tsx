import { type ReactNode, useEffect, useEffectEvent, useState } from "react";
import { DialogContext, type DialogContextProps } from "@/components/ui/dialog/context/dialog-context";

export type DialogStateType = "open" | "closed";

interface DialogProviderProps {
	children: ReactNode;
	onDialogClose?: () => void;
	defaultOpen?: boolean;
	delayCloseTime?: number;
	isOpen?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Provedor do contexto do diálogo.
 * Gerencia o estado de abertura/fechamento e as transições do diálogo.
 */
export function Provider({ children, defaultOpen = false, onDialogClose, isOpen: externalIsOpen, onOpenChange }: DialogProviderProps) {
	const [internalIsOpen, setInternalIsOpen] = useState<boolean>(defaultOpen);
	const isDialogOpen = externalIsOpen ?? internalIsOpen;
	const dialogState: DialogStateType = isDialogOpen ? "open" : "closed";

	/**
	 * Altera o estado de abertura/fechamento do diálogo com transição.
	 */

	const handleChangeDialogState = useEffectEvent((newState: boolean) => {
		if (newState === isDialogOpen) return;
		if (onOpenChange) {
			onOpenChange(newState);
		} else {
			setInternalIsOpen(newState);
		}

		if (!newState) {
			onDialogClose?.();
		}
	});

	/**
	 * Alterna o estado de abertura/fechamento do diálogo.
	 */
	function toggleDialog() {
		handleChangeDialogState(!isDialogOpen);
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: use to close the dialog when location change
	useEffect(() => {
		if (isDialogOpen) {
			handleChangeDialogState(false);
		}
	}, [window.location.pathname]);

	const value: DialogContextProps = {
		isDialogOpen,
		defaultOpen,
		dialogState,
		toggleDialog,
		handleChangeDialogState,
	};

	return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}
