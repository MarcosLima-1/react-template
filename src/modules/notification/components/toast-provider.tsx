import { Toast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { ToastViewport } from "@/modules/notification/components/toast-viewport";
import { toastManager } from "@/modules/notification/lib/toast-manager";

interface ToastProviderProps {
	children: ReactNode;
}

/**
 * Wraps the app with the Base UI Toast.Provider bound to the global toast manager.
 * Place at a high level in the component tree (e.g. main.tsx).
 */
export function ToastProvider({ children }: ToastProviderProps) {
	return (
		<Toast.Provider toastManager={toastManager} timeout={5000} limit={5}>
			{children}
			<ToastViewport />
		</Toast.Provider>
	);
}
