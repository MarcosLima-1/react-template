import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/utils/cn";
import { useFormContext } from "../app-form.tsx";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
	disableOnDefaultValue?: boolean;
}

export function SubmitButton({ children, className, disableOnDefaultValue = false, ...props }: SubmitButtonProps) {
	const Form = useFormContext();

	return (
		<Form.Subscribe
			selector={(state) => [state.canSubmit, state.isValid, state.isSubmitting, state.isDefaultValue]}
			children={([canSubmit, isValid, isSubmitting, isDefaultValue]) => {
				return (
					<Button
						className={cn("relative", className)}
						disabled={!canSubmit || !isValid || isSubmitting || (disableOnDefaultValue && isDefaultValue)}
						type="submit"
						{...props}
					>
						{children}
					</Button>
				);
			}}
		/>
	);
}
