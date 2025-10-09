import type { LucideIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { useFieldContext } from "../app-form.tsx";

export interface SelectOption {
	value: string;
	label: string;
	icon?: LucideIcon;
}

interface SelectFieldProps {
	options: SelectOption[];
	defaultValue?: string;
	placeholder?: string;
}

export function SelectField({ options, placeholder, defaultValue }: SelectFieldProps) {
	const field = useFieldContext();

	return (
		<Select defaultValue={defaultValue} onValueChange={field.handleChange}>
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
