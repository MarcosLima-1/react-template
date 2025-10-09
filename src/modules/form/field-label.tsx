import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";
import { useFieldContext } from "./app-form.tsx";

export function FieldLabel({ children, className, ...props }: ComponentProps<"label">) {
	const field = useFieldContext();

	return (
		<label
			htmlFor={field.name}
			className={cn(
				"mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
		</label>
	);
}
