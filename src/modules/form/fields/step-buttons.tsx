import type { AnyFieldMeta } from "@tanstack/react-form";
import { Button } from "@/components/ui/button.tsx";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { useFieldContext, useFormContext } from "../app-form.tsx";

interface StepButtonsProps {
	lastButtonText?: string;
}

export function StepButtons({ lastButtonText = "Entrar" }: StepButtonsProps) {
	const { backStep, isFirstStep, isLastVisualStep } = useFormStepContext();
	const Form = useFormContext();
	const field = useFieldContext();

	return (
		<div className="mt-4 flex items-center justify-center gap-2">
			<Button variant="outline" onClick={backStep} disabled={isFirstStep}>
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
						<Button type="submit" disabled={isDisabled}>
							{!isLastVisualStep ? "Próximo" : lastButtonText}
						</Button>
					);
				}}
			/>
		</div>
	);
}
