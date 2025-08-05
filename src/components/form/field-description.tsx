import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export function FieldDescription({ children, className, ...props }: ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground mt-2 text-xs", className)} {...props}>
			{children}
		</p>
	);
}
