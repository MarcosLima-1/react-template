import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
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
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
