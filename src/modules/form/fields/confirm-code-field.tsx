import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp.tsx";
import { useFieldContext } from "../app-form.tsx";

interface ConfirmCodeFieldProps {
	className?: string;
}

export function ConfirmCodeField({ className, ...props }: ConfirmCodeFieldProps) {
	const field = useFieldContext<string>();
	const fieldName = field.name;

	return (
		<InputOTP
			className={className}
			autoFocus
			pattern={REGEXP_ONLY_DIGITS}
			name={fieldName}
			id={fieldName}
			maxLength={6}
			value={field.state.value}
			onChange={(value) => field.handleChange(value)}
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
