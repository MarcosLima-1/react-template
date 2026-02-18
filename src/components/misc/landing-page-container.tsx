import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";

interface LandingPageContainerProps extends ComponentProps<"div"> {
	className?: string;
}

export function LandingPageContainer({ className, children, ref, ...props }: LandingPageContainerProps) {
	return (
		<div
			ref={ref}
			data-slot="container"
			className={cn("relative mt-[calc(2rem+var(--header-height))] flex size-full h-fit min-h-175 flex-col items-center gap-10", className)}
			{...props}
		>
			{children}
		</div>
	);
}
