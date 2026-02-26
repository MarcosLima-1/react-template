import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

function LandingContainer({ className, children, ref, ...props }: ComponentProps<"div">) {
	return (
		<div ref={ref} data-slot="container" className={cn("container relative flex size-full gap-4", className)} {...props}>
			{children}
		</div>
	);
}

function LandingPage({ className, children, ref, ...props }: ComponentProps<"div">) {
	return (
		<div
			ref={ref}
			data-slot="container"
			className={cn("relative mt-[calc(2rem+var(--header-height))] flex size-full h-fit min-h-175 flex-col items-center gap-20", className)}
			{...props}
		>
			{children}
		</div>
	);
}

function LandingSection({ className, children, ref, ...props }: ComponentProps<"div">) {
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

interface LandingTitleProps extends ComponentProps<"h2"> {
	title: string;
	description?: string;
	isH1?: boolean;
}

function LandingTitle({ className, title, description, isH1 }: LandingTitleProps) {
	const TitleElement = isH1 ? "h1" : "h2";
	return (
		<div className={cn("mb-10 flex flex-col items-center text-center font-bold text-2xl md:text-4xl", className)}>
			<TitleElement>{title}</TitleElement>
			<div className="mt-2 h-0.5 w-1/2 rounded-full bg-primary" />
			{description && <p className="mt-4 font-medium text-muted-foreground text-sm">{description}</p>}
		</div>
	);
}

export const Landing = {
	Page: LandingPage,
	Section: LandingSection,
	Container: LandingContainer,
	Title: LandingTitle,
};
