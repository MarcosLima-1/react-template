import { useFieldContext } from "@/modules/form/app-form";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export function FieldError({ className, ...props }: ComponentProps<"p">) {
	const field = useFieldContext();
	const error = field.state.meta.errorMap.onChange as Error[] | undefined;
	const isTouched = field.state.meta.isTouched;
	const errorMessage = error?.[0]?.message ?? "Error desconhecido!";

	return (
		<p className={cn("mt-2 flex min-h-4 items-center font-bold text-destructive text-xs", className)} {...props}>
			{isTouched && error && errorMessage}
		</p>
	);
}
