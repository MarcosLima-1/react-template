import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input.tsx";
import { useFieldContext } from "../app-form.tsx";

interface NumberFieldProps extends ComponentProps<typeof Input> {
	disableCharCounter?: boolean;
}

export function NumberField({ min = 0, disableCharCounter, ...props }: NumberFieldProps) {
	const field = useFieldContext<number | null>();
	const fieldName = field.name;

	function handleChange(inputValue: string) {
		let value: number | null;
		if (inputValue === "") {
			value = null;
		} else {
			value = Number(inputValue);
		}
		field.handleChange(value);
	}

	return (
		<Input
			id={fieldName}
			name={fieldName}
			min={min}
			value={field.state.value?.toString() || ""}
			onBlur={field.handleBlur}
			onChange={(e) => handleChange(e.target.value)}
			type="number"
			{...props}
		/>
	);
}
