import type { AnyFieldMeta } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { useFieldContext, useFormContext } from "@/modules/form/context/app-form-context";

interface StepButtonsProps {
	lastButtonText?: string;
}

export function StepButtons({ lastButtonText = "Entrar" }: StepButtonsProps) {
	const { backStep, isFirstStep, isLastVisualStep } = useFormStepContext();
	const Form = useFormContext();
	const field = useFieldContext();

	return (
		<div className="mt-4 flex items-center justify-center gap-2">
			<Button disabled={isFirstStep} onClick={backStep} variant="outline">
				Voltar
			</Button>
			<Form.Subscribe
				selector={(state) => {
					const fieldMeta = state.fieldMeta as Record<string, AnyFieldMeta>;
					const isValid = fieldMeta[field.name]?.isValid;
					const isValidating = fieldMeta[field.name]?.isValidating;
					const isSubmitting = state.isSubmitting;

					return [isValid, isValidating, isSubmitting];
				}}
				children={([isValid, isValidating, isSubmitting]) => {
					const isDisabled = !isValid || isValidating || isSubmitting;

					return (
						<Button disabled={isDisabled} type="submit">
							{!isLastVisualStep ? "Próximo" : lastButtonText}
						</Button>
					);
				}}
			/>
		</div>
	);
}
