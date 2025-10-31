import type { HTMLAttributes } from "react";

/**
 * Componente para a descrição do diálogo.
 */
export function Description({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className="text-muted-foreground text-sm max-md:text-center" {...props}>
			{children}
		</div>
	);
}
