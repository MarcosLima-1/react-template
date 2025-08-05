import { cn } from "@/utils/cn";

interface CardProps extends React.ComponentProps<"div"> {
	isSection?: boolean;
}

export function Card({ className, isSection, ...props }: CardProps) {
	const Element = isSection ? "section" : "div";

	return (
		<Element
			data-slot="card"
			className={cn("flex flex-col gap-6 rounded-md border bg-card p-4 text-card-foreground shadow-sm", className)}
			{...props}
		/>
	);
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-header" className={cn("flex h-fit flex-col items-start gap-1.5 [.border-b]:pb-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-title" className={cn("font-semibold leading-none", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-content" className={className} {...props} />;
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-footer" className={cn("flex items-center [.border-t]:pt-6", className)} {...props} />;
}
