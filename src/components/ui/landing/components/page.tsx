import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";


interface LandingPageProps extends ComponentProps<"div"> {
	className?: string;
}

export function LandingPage({ className, children, ref, ...props }: LandingPageProps) {
	return (
		<div
			ref={ref}
			data-slot="container"
			className={cn(
				"relative mt-[calc(2rem+var(--header-height))] flex size-full h-fit min-h-175 flex-col items-center gap-20",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
