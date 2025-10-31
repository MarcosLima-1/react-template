import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

/**
 * Componente para o título do diálogo.
 */
export function Title({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<h2 className={cn("flex items-center gap-2 font-bold text-lg max-md:justify-center", className)} {...props}>
			{children}
		</h2>
	);
}
