import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CentsField } from "@/modules/form/fields/cents-field.tsx";
import { ConfirmCodeField } from "@/modules/form/fields/confirm-code-field.tsx";
import { NumberField } from "@/modules/form/fields/number-field.tsx";
import { SelectField } from "@/modules/form/fields/select-field.tsx";
import { StepButtons } from "@/modules/form/fields/step-buttons.tsx";
import { PasswordField } from "./fields/password-field.tsx";
import { SubmitButton } from "./fields/submit-button.tsx";
import { TextField } from "./fields/text-field.tsx";
import { TextareaField } from "./fields/textarea-field.tsx";

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
