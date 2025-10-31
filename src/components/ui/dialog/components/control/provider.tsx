import { useRouterState } from "@tanstack/react-router";
import { type ReactNode, useCallback, useEffect, useState } from "react";
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
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
	const { isLoading: isChangingLocation } = useRouterState();

	const isDialogOpen = externalIsOpen ?? isOpen;
	const dialogState: DialogStateType = isDialogOpen ? "open" : "closed";

	/**
	 * Altera o estado de abertura/fechamento do diálogo com transição.
	 */
	const handleChangeDialogState = useCallback(
		(newState: boolean) => {
			if (newState === isDialogOpen) return;
			if (onOpenChange) {
				onOpenChange(newState);
			} else {
				setIsOpen(newState);
			}

			if (!newState) {
				onDialogClose?.();
			}
		},
		[isDialogOpen, onDialogClose, onOpenChange],
	);
	/**
	 * Alterna o estado de abertura/fechamento do diálogo.
	 */
	function toggleDialog() {
		handleChangeDialogState(!isDialogOpen);
	}

	useEffect(() => {
		if (isChangingLocation && isDialogOpen) {
			handleChangeDialogState(false);
		}
	}, [isDialogOpen, handleChangeDialogState, isChangingLocation]);

	const value: DialogContextProps = {
		isDialogOpen,
		defaultOpen,
		dialogState,
		toggleDialog,
		handleChangeDialogState,
	};

	return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}
