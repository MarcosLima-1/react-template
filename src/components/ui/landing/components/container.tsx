import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

interface LandingContainerProps extends ComponentProps<"div"> {
	className?: string;
}

export function LandingContainer({ className, children, ref, ...props }: LandingContainerProps) {
	return (
		<div ref={ref} data-slot="container" className={cn("container relative flex size-full gap-4", className)} {...props}>
			{children}
		</div>
	);
}
