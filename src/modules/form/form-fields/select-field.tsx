import type { LucideIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldContext } from "@/modules/form/app-form";

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
	const field = useFieldContext<string>();
	const value = field.state.value;

	return (
		<Select value={value} defaultValue={defaultValue} onValueChange={field.handleChange}>
			<SelectTrigger id={field.name} className="w-[180px]">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((value) => (
					<SelectItem key={value.value} value={value.value}>
						{value.icon && <value.icon />}
						{value.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
