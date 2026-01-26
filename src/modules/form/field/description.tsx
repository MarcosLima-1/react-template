import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export function FieldDescription({ children, className, ...props }: ComponentProps<"p">) {
	return (
		<p className={cn("mt-2 text-muted-foreground text-xs", className)} {...props}>
			{children}
		</p>
	);
}
