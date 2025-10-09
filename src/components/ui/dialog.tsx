import { Slot } from "@radix-ui/react-slot";
import { useRouterState } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { createContext, use, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useKeypress } from "@/hooks/use-key-press.ts";
import { cn } from "@/utils/cn";
import { Button, type ButtonProps } from "./button.tsx";

type DialogStateType = "open" | "closed" | "transitioning";
type IsTransitioningType = "opening" | "closing" | undefined;

interface DialogContextProps {
	isDialogOpen: boolean;
	defaultOpen: boolean;
	toggleDialog: () => void;
	handleChangeDialogState: (newState: boolean) => void;
	isTransitioning: IsTransitioningType;
	dialogState: DialogStateType;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

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
export function DialogProvider({
	children,
	delayCloseTime = 200,
	defaultOpen = false,
	onDialogClose,
	isOpen: externalIsOpen,
	onOpenChange,
}: DialogProviderProps) {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
	const [isTransitioning, setIsTransitioning] = useState<IsTransitioningType>(undefined);
	const { isLoading: isChangingLocation } = useRouterState();

	const isDialogOpen = externalIsOpen ?? isOpen;
	const dialogState: DialogStateType = isDialogOpen ? "open" : isTransitioning ? "transitioning" : "closed";

	/**
	 * Altera o estado de abertura/fechamento do diálogo com transição.
	 */
	function handleChangeDialogState(newState: boolean) {
		if (newState === isDialogOpen || isTransitioning) return;
		setIsTransitioning(newState ? "opening" : "closing");
		if (onOpenChange) {
			onOpenChange(newState);
		} else {
			setIsOpen(newState);
		}

		if (!newState) {
			onDialogClose?.();
		}

		setTimeout(() => {
			setIsTransitioning(undefined);
		}, delayCloseTime);
	}

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
		isTransitioning,
	};

	return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

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

interface DialogPortalProps {
	children: ReactNode;
	containerElement?: HTMLElement | null;
	className?: string;
}

/**
 * Componente que renderiza o conteúdo do diálogo fora da árvore DOM principal
 * usando `createPortal`.
 */
export function DialogPortal({ children, containerElement, className }: DialogPortalProps) {
	const { isDialogOpen, isTransitioning } = useDialogContext();

	if (!isDialogOpen && !isTransitioning) return null;

	return createPortal(
		<div className={cn("fixed top-0 left-0 z-50 flex size-full items-center justify-center", className)}>{children}</div>,
		containerElement ?? document.body,
	);
}

interface DialogOverlayProps extends HTMLAttributes<HTMLButtonElement> {
	onInteractOverlay?: () => void;
}

/**
 * Componente de overlay (fundo escuro) do diálogo.
 * O clique no overlay fecha o diálogo.
 */
export function DialogOverlay({ className, onInteractOverlay, ...props }: DialogOverlayProps) {
	const { isDialogOpen, dialogState, isTransitioning, handleChangeDialogState } = useDialogContext();

	if (!isDialogOpen && !isTransitioning) return null;

	function handleOverlayClick() {
		onInteractOverlay?.();
		handleChangeDialogState(false);
	}

	return (
		<button
			data-state={dialogState}
			data-slot="dialog-overlay"
			onClick={handleOverlayClick}
			className={cn(
				"motion-preset-fade motion-opacity-in-0 data-[state=open]:motion-opacity-in-0 data-[state=closing]:motion-opacity-out-0 motion-duration-200 size-full bg-black/50",
				className,
				{
					"motion-opacity-out-0": isTransitioning === "closing",
				},
			)}
			{...props}
		/>
	);
}

/**
 * Componente para o conteúdo principal do diálogo.
 * Contém a caixa modal que aparece sobre o overlay.
 */
export function DialogContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	const dialogRef = useRef<HTMLDivElement>(null);
	const { dialogState, isTransitioning, handleChangeDialogState } = useDialogContext();

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
				"motion-duration-200 motion-opacity-in-0 motion-scale-in-95 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-50 flex w-full max-w-2xl flex-col gap-4 rounded-md border bg-background p-4 shadow-lg max-md:max-w-[95%]",
				className,
				{
					"motion-opacity-out-0 motion-scale-out-95": isTransitioning === "closing",
				},
			)}
			{...props}
		/>
	);
}

interface DialogSimpleProps extends HTMLAttributes<HTMLDivElement>, DialogPortalProps {
	children: ReactNode;
	onInteractOutside?: () => void;
	hideCloseButton?: boolean;
	classNamePortal?: string;
}

/**
 * Um componente de diálogo simples que combina Portal, Overlay e Content.
 * Útil para casos de uso básicos.
 */
export function DialogSimple({
	children,
	hideCloseButton,
	classNamePortal,
	containerElement,
	onInteractOutside,
	...props
}: DialogSimpleProps) {
	const handleOnInteractOutside = useCallback(() => {
		onInteractOutside?.();
	}, [onInteractOutside]);

	return (
		<DialogPortal containerElement={containerElement} className={classNamePortal}>
			<DialogOverlay onInteractOverlay={handleOnInteractOutside} />
			<DialogContent {...props}>
				{!hideCloseButton && <DialogCloseButton />}
				{children}
			</DialogContent>
		</DialogPortal>
	);
}

export function DialogCloseButton({ className, children, asChild, ...props }: ButtonProps) {
	const { handleChangeDialogState } = useDialogContext();

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		e.stopPropagation();
		handleChangeDialogState(false);
	}

	if (asChild) {
		return (
			<Slot onClick={handleClick} {...props}>
				{children}
			</Slot>
		);
	}

	return (
		<Button className={cn("absolute top-2 right-2", className)} variant="ghost" onClick={handleClick} {...props}>
			<XIcon />
		</Button>
	);
}

/**
 * Componente para o cabeçalho do diálogo.
 */
export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("mb-4 flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />;
}

/**
 * Componente para o título do diálogo.
 */
export function DialogTitle({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<h2 className="flex items-center gap-2 font-bold text-lg max-md:justify-center" {...props}>
			{children}
		</h2>
	);
}

/**
 * Componente para a descrição do diálogo.
 */
export function DialogDescription({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className="text-muted-foreground text-sm max-md:text-center" {...props}>
			{children}
		</div>
	);
}

/**
 * Componente para o rodapé do diálogo.
 */
export function DialogFooter({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className="mt-auto flex w-full justify-end gap-2" {...props}>
			{children}
		</div>
	);
}

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
