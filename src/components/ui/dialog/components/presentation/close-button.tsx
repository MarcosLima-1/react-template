import { Slot } from "@radix-ui/react-slot";
import { XIcon } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useDialogContext } from "@/components/ui/dialog/context/dialog-context";
import { cn } from "@/utils/cn";

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
