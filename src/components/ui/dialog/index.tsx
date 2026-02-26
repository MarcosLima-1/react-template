import { type DialogPopupProps, type DialogPortalProps, Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "tailwind-variants";
import { Button } from "@/components/ui/button";

function DialogRoot({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-overlay"
			className={cn(
				"data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 isolate z-50 bg-black/10 duration-100 data-closed:animate-out data-open:animate-in supports-backdrop-filter:backdrop-blur-xs",
				className,
			)}
			{...props}
		/>
	);
}

interface DialogContentProps extends DialogPopupProps {
	showCloseButton?: boolean;
	portalContainer?: DialogPortalProps["container"];
}

function DialogContent({ className, children, showCloseButton = true, portalContainer, ...props }: DialogContentProps) {
	return (
		<DialogPortal container={portalContainer}>
			<DialogOverlay />
			<DialogPrimitive.Popup
				data-slot="dialog-content"
				className={cn(
					"data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 text-sm outline-none ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in sm:max-w-sm",
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						render={
							<Button variant="ghost" className="absolute top-2 right-2" size="icon">
								<XIcon />
								<span className="sr-only">Close</span>
							</Button>
						}
					/>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	);
}
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="dialog-header" className={cn("flex flex-col gap-2", className)} {...props} />;
}
function DialogFooter({
	className,
	showCloseButton = false,
	children,
	...props
}: React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
}) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end", className)}
			{...props}
		>
			{children}
			{showCloseButton && <DialogPrimitive.Close render={<Button variant="outline">Close</Button>} />}
		</div>
	);
}
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return <DialogPrimitive.Title data-slot="dialog-title" className={cn("font-medium text-base leading-none", className)} {...props} />;
}
function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("text-muted-foreground text-sm *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground", className)}
			{...props}
		/>
	);
}

export const Dialog = {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Portal: DialogPortal,
	Overlay: DialogOverlay,
	Content: DialogContent,
	Header: DialogHeader,
	Footer: DialogFooter,
	Title: DialogTitle,
	Description: DialogDescription,
	Close: DialogClose,
};
