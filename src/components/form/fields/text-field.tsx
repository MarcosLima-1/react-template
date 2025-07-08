import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input.tsx";
import { useFieldContext } from "../app-form.tsx";

interface TextFieldProps extends ComponentProps<typeof Input> {
	disableCharCounter?: boolean;
}

export function TextField({ maxLength, disableCharCounter, ...props }: TextFieldProps) {
	const field = useFieldContext<string>();
	const fieldName = field.name;
	const valueLength = field.state.value?.length ?? 0;

	return (
		<div className="relative w-full">
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
				<div className="text-xs text-muted-foreground mt-1 justify-self-end">
					{valueLength}/{maxLength}
				</div>
			)}
		</div>
	);
}
