import type { ComponentProps, KeyboardEvent, WheelEvent } from "react";
import { Input } from "@/components/ui/input.tsx";
import { beautifyCents } from "@/utils/formatters/beautify-cents.ts";
import { useFieldContext } from "../app-form.tsx";

interface CentsFieldProps extends ComponentProps<typeof Input> {
	disableCharCounter?: boolean;
	min?: number;
	max?: number;
}

export function CentsField({ min = 0, disableCharCounter, ...props }: CentsFieldProps) {
	const field = useFieldContext<number | null>();
	const fieldName = field.name;
	const value = field.state.value;
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
		<div className="flex items-center gap-2">
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
			<p>{value ? beautifyCents(value) : 0}</p>
		</div>
	);
}
