import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export function FieldWrapper({ children, className, ...props }: ComponentProps<"div">) {
	return (
		<div className={cn("flex w-full flex-col", className)} {...props}>
			{children}
		</div>
	);
}
