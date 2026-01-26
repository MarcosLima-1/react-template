import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

interface LandingSectionProps extends ComponentProps<"div"> {
	className?: string;
}

export function LandingSection({ className, children, ref, ...props }: LandingSectionProps) {
	return (
		<section
			ref={ref}
			data-slot="section"
			className={cn("relative flex w-full max-w-7xl flex-col items-center px-6", className)}
			{...props}
		>
			{children}
		</section>
	);
}
