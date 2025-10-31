import { type HTMLAttributes, type ReactNode, useCallback } from "react";
import { Dialog } from "@/components/ui/dialog";
import type { DialogPortalProps } from "@/components/ui/dialog/components/control/portal";

interface DialogSimpleProps extends HTMLAttributes<HTMLDivElement>, DialogPortalProps {
	children: ReactNode;
	onInteractOutside?: () => void;
	classNamePortal?: string;
}

/**
 * Um componente de diálogo simples que combina Portal, Overlay e Content.
 * Útil para casos de uso básicos.
 */
export function BasicDialog({ children, classNamePortal, containerElement, onInteractOutside, ...props }: DialogSimpleProps) {
	const handleOnInteractOutside = useCallback(() => {
		onInteractOutside?.();
	}, [onInteractOutside]);

	return (
		<Dialog.portal className={classNamePortal} containerElement={containerElement}>
			<Dialog.overlay onInteractOverlay={handleOnInteractOutside} />
			<Dialog.content {...props}>{children}</Dialog.content>
		</Dialog.portal>
	);
}
