import type { ComponentProps } from "react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { cn } from "@/utils/cn";
import { useFieldContext } from "../app-form.tsx";

interface TextareaFieldProps extends ComponentProps<typeof Textarea> {
	disableCharCounter?: boolean;
}

export function TextareaField({ className, disableCharCounter, maxLength, ...props }: TextareaFieldProps) {
	const field = useFieldContext<string>();
	const valueLength = field.state.value?.length ?? 0;

	return (
		<div className="relative">
			<Textarea
				id={field.name}
				maxLength={maxLength}
				name={field.name}
				onChange={(e) => field.handleChange(e.target.value)}
				value={field.state.value}
				className={cn("h-[200px] resize-none", className)}
				{...props}
			/>
			{!disableCharCounter && maxLength && (
				<div className="mt-1 flex w-full justify-end text-[0.625rem] text-muted-foreground">
					{valueLength}/{maxLength}
				</div>
			)}
		</div>
	);
}
