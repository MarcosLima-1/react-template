import { cn } from "@/utils/cn";

interface CardProps extends React.ComponentProps<"div"> {
	isSection?: boolean;
}

export function Card({ className, isSection, ...props }: CardProps) {
	return (
		<div
			data-slot="card"
			className={cn("flex flex-col gap-6 rounded-md border bg-card p-4 text-card-foreground shadow-sm", className)}
			{...props}
		/>
	);
}

function Header({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-header" className={cn("flex h-fit flex-col items-start gap-1.5 [.border-b]:pb-6", className)} {...props} />;
}

function Title({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-title" className={cn("font-semibold leading-none", className)} {...props} />;
}

function Description({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function Content({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-content" className={className} {...props} />;
}

function Footer({ className, ...props }: React.ComponentProps<"div">) {
	return <div data-slot="card-footer" className={cn("flex items-center [.border-t]:pt-6", className)} {...props} />;
}

Card.Header = Header;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;
Card.Footer = Footer;
