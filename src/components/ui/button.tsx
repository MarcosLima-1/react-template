import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode, RefObject } from "react";
import { cn } from "@/utils/cn";

const buttonVariants = {
	default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
	destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
	outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
	secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
	default: "h-9 px-4 py-2",
	sm: "h-8 rounded-md px-3 text-xs",
	lg: "h-10 rounded-md px-8",
	icon: "h-9 w-9",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	ref?: RefObject<HTMLButtonElement>;
	children?: ReactNode;
	variant?: keyof typeof buttonVariants;
	size?: keyof typeof buttonSizes;
}

export function Button({
	ref,
	asChild,
	className,
	children,
	type = "button",
	size = "default",
	variant = "default",
	disabled,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			disabled={disabled}
			data-disabled={disabled ? "true" : "false"}
			type={type}
			className={cn(
				"opacity] inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold text-sm transition-[colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
				buttonVariants[variant],
				buttonSizes[size],
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</Comp>
	);
}
