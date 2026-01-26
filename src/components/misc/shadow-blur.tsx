import type { HtmlHTMLAttributes } from "react";
import { cn } from "tailwind-variants";

interface ShadowBlurProps extends HtmlHTMLAttributes<HTMLDivElement> {
	className?: string;
	blur?: number;
	spread?: number;
}

export function ShadowBlur({ className, blur = 200, spread = 40, style, ...props }: ShadowBlurProps) {
	return (
		<div
			style={{
				boxShadow: `0 0px ${blur}px ${spread}px var(--primary)`,
				...style,
			}}
			className={cn(
				"motion-preset-fade motion-duration-1000 -z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none absolute size-px bg-transparent max-md:transition-all",
				className,
			)}
			{...props}
		/>
	);
}
