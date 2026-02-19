import type { ComponentPropsWithRef } from "react";
import { cn } from "tailwind-variants";
import { useFieldContext } from "@/modules/form/lib/app-form";

function FieldLabel({ children, className, ...props }: ComponentPropsWithRef<"label">) {
	const field = useFieldContext();

	return (
		<label
			className={cn(
				"mb-4 flex select-none items-center gap-2 font-bold text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
				className,
			)}
			htmlFor={field.name}
			{...props}
		>
			{children}
		</label>
	);
}

function FieldWrapper({ children, className, ...props }: ComponentPropsWithRef<"div">) {
	return (
		<div className={cn("flex w-full flex-col", className)} {...props}>
			{children}
		</div>
	);
}

function FieldError({ className, ...props }: ComponentPropsWithRef<"p">) {
	const field = useFieldContext();
	const errors = field.state.meta.errors;
	const isTouched = field.state.meta.isTouched;

	if (!errors || !isTouched || !errors.length) return null;

	const errorMessage = errors[0].message ?? "Campo inválido";

	return (
		<p className={cn("mt-2 flex min-h-4 items-center font-bold text-destructive text-xs", className)} {...props}>
			{errorMessage}
		</p>
	);
}

function FieldDescription({ children, className, ...props }: ComponentPropsWithRef<"p">) {
	return (
		<p className={cn("mt-2 text-muted-foreground text-xs", className)} {...props}>
			{children}
		</p>
	);
}

export const Field = {
	Label: FieldLabel,
	Wrapper: FieldWrapper,
	Error: FieldError,
	Description: FieldDescription,
};
