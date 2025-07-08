import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { ChoosePostCollectionField } from "./fields/choose-post-collection-field.tsx";
import { ConfirmCodeField } from "./fields/confirm-code-field.tsx";
import { DragAndDropField } from "./fields/drag-and-drop-field.tsx";
import { PasswordField } from "./fields/password-field.tsx";
import { SelectField } from "./fields/select-field.tsx";
import { StepButtons } from "./fields/step-buttons.tsx";
import { SubmitButton } from "./fields/submit-button.tsx";
import { TagsField } from "./fields/tags-field.tsx";
import { TextField } from "./fields/text-field.tsx";
import { TextareaField } from "./fields/textarea-field.tsx";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
		TextareaField,
		PasswordField,
		ConfirmCodeField,
		DragAndDropField,
		ChoosePostCollectionField,
		SelectField,
		TagsField,
		StepButtons,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});
