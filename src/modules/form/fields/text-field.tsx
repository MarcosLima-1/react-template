import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input.tsx";
import { cn } from "@/utils/cn.ts";
import { useFieldContext } from "../app-form.tsx";

interface TextFieldProps extends ComponentProps<typeof Input> {
	disableCharCounter?: boolean;
}

export function TextField({ maxLength, disableCharCounter, className, ...props }: TextFieldProps) {
	const field = useFieldContext<string>();
	const fieldName = field.name;
	const valueLength = field.state.value?.length ?? 0;

	return (
		<div className={cn(className, "relative")}>
			<Input
				id={fieldName}
				name={fieldName}
				maxLength={maxLength}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				type="text"
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
