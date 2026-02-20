import type { LucideIcon } from "lucide-react";
import { Select } from "@/components/ui/select";
import { useFieldContext } from "@/modules/form/context/app-form-context";

export interface SelectOption<T extends string = string> {
	value: T;
	label: string;
	icon?: LucideIcon;
}

interface SelectFieldProps<T extends string> {
	options: readonly SelectOption<T>[];
	defaultValue?: T;
	placeholder?: string;
}

export function SelectField<T extends string>({ options, placeholder, defaultValue }: SelectFieldProps<T>) {
	const field = useFieldContext<string | null>();
	const value = field.state.value;

	return (
		<Select.Root items={options} value={value} defaultValue={defaultValue} onValueChange={field.handleChange}>
			<Select.Trigger id={field.name} className="w-45">
				<Select.Value placeholder={placeholder} />
			</Select.Trigger>
			<Select.Content>
				{options.map((value) => (
					<Select.Item key={value.value} value={value.value}>
						{value.icon && <value.icon />}
						{value.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
}
