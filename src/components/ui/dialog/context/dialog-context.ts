import { createContext, use } from "react";
import type { DialogStateType } from "@/components/ui/dialog/components/control/provider";

export interface DialogContextProps {
	isDialogOpen: boolean;
	defaultOpen: boolean;
	toggleDialog: () => void;
	handleChangeDialogState: (newState: boolean) => void;
	dialogState: DialogStateType;
}

export const DialogContext = createContext<DialogContextProps | undefined>(undefined);

/**
 * Hook personalizado para acessar o contexto do diálogo.
 * Garante que o hook seja usado dentro de um DialogProvider.
 */
export function useDialogContext() {
	const context = use(DialogContext);

	if (context === undefined) {
		throw new Error("useDialogContext must be used within a DialogProvider");
	}

	return context;
}
