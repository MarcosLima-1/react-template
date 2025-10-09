import type { ComponentProps } from "react";
import { useFieldContext } from "@/modules/form/app-form";
import { cn } from "@/utils/cn";

export function FieldErros({ className, ...props }: ComponentProps<"p">) {
	const field = useFieldContext();
	const erro = field.state.meta.errorMap.onChange as Error[] | undefined;
	const isTouched = field.state.meta.isTouched;

	return (
		<p className={cn("mt-2 flex min-h-4 items-center font-bold text-destructive text-xs", className)} {...props}>
			{isTouched && erro && erro[0].message}
		</p>
	);
}
