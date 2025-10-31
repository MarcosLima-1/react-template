import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDialogContext } from "@/components/ui/dialog/context/dialog-context";
import { cn } from "@/utils/cn";

export interface DialogPortalProps {
	children: ReactNode;
	containerElement?: HTMLElement | null;
	className?: string;
}

/**
 * Componente que renderiza o conteúdo do diálogo fora da árvore DOM principal
 * usando `createPortal`.
 */

export function PortalContent({ children, className }: Omit<DialogPortalProps, "containerElement">) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			className={cn("fixed top-0 left-0 z-50 flex size-full items-center justify-center", className)}
		>
			{children}
		</motion.div>
	);
}

export function Portal({ children, containerElement, className }: DialogPortalProps) {
	const { isDialogOpen } = useDialogContext();
	const content = <AnimatePresence>{isDialogOpen && <PortalContent className={className}>{children}</PortalContent>}</AnimatePresence>;
	return createPortal(content, containerElement ?? document.body);
}
