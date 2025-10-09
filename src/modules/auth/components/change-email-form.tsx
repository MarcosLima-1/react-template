import { MailCheckIcon } from "lucide-react";
import { z } from "zod/v4";
import { useMutationChangeEmail } from "@/modules/auth/api/change-email";
import { useMutationCheckEmailAvailability } from "@/modules/auth/api/check-email-availability";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { valideateEmail } from "@/modules/auth/types/register";
import { signOut } from "@/modules/auth/utils/auth";
import { useAppForm } from "@/modules/form/app-form";
import { FieldDescription } from "@/modules/form/field-description";
import { FieldErros } from "@/modules/form/field-erros";
import { FieldLabel } from "@/modules/form/field-label";
import { FieldWrapper } from "@/modules/form/field-wrapper";
import { SendSecurityCodeField } from "@/modules/form/fields/send-security-code-field";

export const changeEmailSchema = z.object({
	securityCode: z.string().max(6).min(6),
	newEmail: valideateEmail,
	confirmEmail: valideateEmail,
});

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;

export function ChangeEmailForm() {
	const { mutateAsync: CheckEmailAvailability } = useMutationCheckEmailAvailability();
	const { currentStep, nextStep } = useFormStepContext();
	const { mutateAsync: changeEmail } = useMutationChangeEmail();

	const defaultValues: ChangeEmailSchema = {
		securityCode: "",
		newEmail: "",
		confirmEmail: "",
	};

	const Form = useAppForm({
		validators: {
			onChange: changeEmailSchema,
			onMount: changeEmailSchema,
			onSubmit: changeEmailSchema,
		},
		defaultValues,
		onSubmit: ({ value }) => onSubmit(value),
	});

	async function onSubmit({ newEmail, securityCode }: ChangeEmailSchema) {
		await changeEmail({
			securityCode,
			newEmail,
		});

		signOut();
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-6">
			{currentStep === 1 && <SendSecurityCodeField placeholder="markin@example.com" purpose="EMAIL_CHANGE" onSendCode={nextStep} />}
			{currentStep === 2 && (
				<form onSubmit={nextStep}>
					<Form.AppField
						name="securityCode"
						children={(Field) => {
							return (
								<FieldWrapper className="items-center">
									<FieldLabel>
										<MailCheckIcon /> Só mais uma coisinha!
									</FieldLabel>
									<Field.ConfirmCodeField />
									<FieldDescription>Enviamos um codigo de 6 digitos para o seu email!</FieldDescription>
									<Form.AppForm>
										<Field.StepButtons />
									</Form.AppForm>
								</FieldWrapper>
							);
						}}
					/>
				</form>
			)}
			{currentStep === 3 && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						Form.handleSubmit();
					}}
					className="w-full space-y-2"
				>
					<Form.AppField
						name="newEmail"
						validators={{
							onChangeAsyncDebounceMs: 500,
							onChangeAsync: async ({ value }) => {
								const { data } = await CheckEmailAvailability({
									email: value,
								});
								const { isAvailable } = data;

								return !isAvailable ? [new Error("Este e-mail já está cadastrado.")] : undefined;
							},
						}}
						children={(Field) => {
							return (
								<FieldWrapper>
									<FieldLabel>Novo email: </FieldLabel>
									<Field.TextField autoComplete="email" maxLength={255} />
								</FieldWrapper>
							);
						}}
					/>
					<Form.AppField
						name="confirmEmail"
						validators={{
							onChangeListenTo: ["newEmail"],
							onChange: ({ value, fieldApi }) => {
								if (value !== fieldApi.form.getFieldValue("newEmail")) {
									return [new Error("Emails não coincidem!")];
								}
								return undefined;
							},
						}}
						children={(Field) => {
							return (
								<FieldWrapper>
									<FieldLabel>Confirme o email: </FieldLabel>
									<Field.TextField autoComplete="email" maxLength={255} />
									<FieldErros />
									<Form.AppForm>
										<Field.StepButtons lastButtonText="Alterar senha" />
									</Form.AppForm>
								</FieldWrapper>
							);
						}}
					/>
				</form>
			)}
		</div>
	);
}
