import type { AnyFieldMeta } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

interface FieldErrosProps extends ComponentProps<"p"> {
	meta: AnyFieldMeta;
}

export function FieldErros({ meta, className, ...props }: FieldErrosProps) {
	const erro = meta.errorMap.onChange as Error[] | undefined;
	const isTouched = meta.isTouched;

	return (
		<p className={cn("text-destructive mt-2 flex min-h-4 items-center text-xs font-bold", className)} {...props}>
			{isTouched && erro && erro[0].message}
		</p>
	);
}
