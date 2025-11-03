import type { LucideIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldContext } from "@/modules/form/app-form";

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
			<SelectTrigger className="w-[180px]" id={field.name}>
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
