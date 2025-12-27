import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface LandingSectionProps extends ComponentProps<"div"> {
	className?: string;
}

export function LandingSection({ className, children, ref, ...props }: LandingSectionProps) {
	return (
		<section
			ref={ref}
			data-slot="section"
			className={cn("relative flex w-full flex-col items-center justify-center gap-10 px-2 sm:px-4", className)}
			{...props}
		>
			{children}
		</section>
	);
}
