import type { HTMLAttributes } from "react";

/**
 * Componente para o rodapé do diálogo.
 */
export function Footer({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div className="mt-auto flex w-full justify-end gap-2" {...props}>
			{children}
		</div>
	);
}
