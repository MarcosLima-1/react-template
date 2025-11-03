import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useFieldContext } from "@/modules/form/app-form";

interface ConfirmCodeFieldProps {
	className?: string;
}

export function ConfirmCodeField({ className, ...props }: ConfirmCodeFieldProps) {
	const field = useFieldContext<string>();
	const fieldName = field.name;

	return (
		<InputOTP
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
			<InputOTPGroup>
				<InputOTPSlot index={0} />
				<InputOTPSlot index={1} />
				<InputOTPSlot index={2} />
			</InputOTPGroup>
			<InputOTPSeparator />
			<InputOTPGroup>
				<InputOTPSlot index={3} />
				<InputOTPSlot index={4} />
				<InputOTPSlot index={5} />
			</InputOTPGroup>
		</InputOTP>
	);
}
