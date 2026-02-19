import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP } from "@/components/ui/input-otp";
import { useFieldContext } from "@/modules/form/lib/app-form";

interface ConfirmCodeFieldProps {
	className?: string;
}

export function ConfirmCodeField({ className, ...props }: ConfirmCodeFieldProps) {
	const field = useFieldContext<string>();
	const fieldName = field.name;

	return (
		<InputOTP.Root
			autoFocus
			className={className}
			id={fieldName}
			maxLength={6}
			name={fieldName}
			onChange={(value) => field.handleChange(value)}
			pattern={REGEXP_ONLY_DIGITS}
			value={field.state.value}
			{...props}
		>
			<InputOTP.Group>
				<InputOTP.Slot index={0} />
				<InputOTP.Slot index={1} />
				<InputOTP.Slot index={2} />
			</InputOTP.Group>
			<InputOTP.Separator />
			<InputOTP.Group>
				<InputOTP.Slot index={3} />
				<InputOTP.Slot index={4} />
				<InputOTP.Slot index={5} />
			</InputOTP.Group>
		</InputOTP.Root>
	);
}
