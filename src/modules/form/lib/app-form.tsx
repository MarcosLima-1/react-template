import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CentsField } from "@/modules/form/components/form-fields/cents-field";
import { ConfirmCodeField } from "@/modules/form/components/form-fields/confirm-code-field";
import { NumberField } from "@/modules/form/components/form-fields/number-field";
import { PasswordField } from "@/modules/form/components/form-fields/password-field";
import { SelectField } from "@/modules/form/components/form-fields/select-field";
import { StepButtons } from "@/modules/form/components/form-fields/step-buttons";
import { SubmitButton } from "@/modules/form/components/form-fields/submit-button";
import { TextField } from "@/modules/form/components/form-fields/text-field";
import { TextareaField } from "@/modules/form/components/form-fields/textarea-field";

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		TextareaField,
		PasswordField,
		ConfirmCodeField,
		NumberField,
		StepButtons,
		CentsField,
		SelectField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
