import type { ComponentProps, KeyboardEvent, WheelEvent } from "react";
import { Input } from "@/components/ui/input.tsx";
import { useFieldContext } from "../app-form.tsx";

interface NumberFieldProps extends ComponentProps<typeof Input> {
	disableCharCounter?: boolean;
	min?: number;
	max?: number;
}

export function NumberField({ min = 0, disableCharCounter, ...props }: NumberFieldProps) {
	const field = useFieldContext<number | null>();
	const fieldName = field.name;

	function handleChange(inputValue: string) {
		let value: number = Number(inputValue);

		if (Number.isNaN(value)) {
			value = 0;
		}

		if (value < min) {
			value = min;
		}

		field.handleChange(value);
	}

	function handleWheel(event: WheelEvent) {
		event.preventDefault();

		const currentValue = field.state.value || 0;
		let newValue = currentValue;

		if (event.deltaY < 0) {
			newValue = currentValue + 1;
		} else if (event.deltaY > 0) {
			newValue = currentValue - 1;
		}

		if (newValue < min) {
			newValue = min;
		}

		field.handleChange(newValue);
	}

	function handleKey(event: KeyboardEvent) {
		const currentValue = field.state.value || 0;
		let newValue = currentValue;

		if (event.key === "ArrowUp") {
			newValue = currentValue + 1;
		} else if (event.key === "ArrowDown") {
			newValue = currentValue - 1;
		}

		if (newValue < min) {
			newValue = min;
		}

		field.handleChange(newValue);
	}

	return (
		<Input
			id={fieldName}
			name={fieldName}
			min={min}
			onWheel={handleWheel}
			onKeyDown={handleKey}
			value={field.state.value?.toString() || ""}
			onBlur={field.handleBlur}
			onChange={(e) => handleChange(e.target.value)}
			type="text"
			{...props}
		/>
	);
}
