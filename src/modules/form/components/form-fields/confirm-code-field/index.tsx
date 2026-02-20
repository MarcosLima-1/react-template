import { Input } from "@/components/ui/input";
import { useFieldContext } from "@/modules/form/context/app-form-context";

interface ConfirmCodeFieldProps {
	className?: string;
}

export function ConfirmCodeField({ className, ...props }: ConfirmCodeFieldProps) {
	const field = useFieldContext<string>();
	const fieldName = field.name;

	return (
		<Input
			className={className}
			id={fieldName}
			inputMode="numeric"
			maxLength={6}
			name={fieldName}
			onChange={(e) => {
				const val = e.target.value.replace(/\D/g, "");
				field.handleChange(val.slice(0, 6));
			}}
			pattern="[0-9]*"
			type="text"
			value={field.state.value}
			{...props}
		/>
	);
}
