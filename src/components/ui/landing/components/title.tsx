import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface LandingTitleProps extends ComponentProps<"h2"> {
	title: string;
	className?: string;
	description?: string;
	isH1?: boolean;
}

export function LandingTitle({ className, title, description, isH1 }: LandingTitleProps) {
	const TitleElement = isH1 ? "h1" : "h2";
	return (
		<div className={cn("mb-10 flex flex-col items-center text-center font-bold text-2xl md:text-4xl", className)}>
			<TitleElement>{title}</TitleElement>
			<div className="mt-2 h-0.5 w-1/2 rounded-full bg-primary" />
			{description && <p className="mt-4 font-medium text-muted-foreground text-sm">{description}</p>}
		</div>
	);
}
