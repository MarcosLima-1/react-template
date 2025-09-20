import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";
import { useFieldContext } from "./app-form.tsx";

export function FieldLabel({ children, className, ...props }: ComponentProps<"label">) {
	const field = useFieldContext();

	return (
		<label
			htmlFor={field.name}
			className={cn(
				"mb-4 flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
		</label>
	);
}
