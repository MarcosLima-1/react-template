import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const inputVariants = {
	default:
		"bg-input/30 border-input rounded-md focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	outline: "focus:border-primary border-b border-2 border-x-0 border-t-0",
};

interface InputProps extends ComponentProps<"input"> {
	variant?: keyof typeof inputVariants;
}

export function Input({ className, variant = "default", type, ...props }: InputProps) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow,border] selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm",
				inputVariants[variant],
				className,
			)}
			{...props}
		/>
	);
}
