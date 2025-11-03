import { MailCheckIcon } from "lucide-react";
import { z } from "zod/v4";
import { useMutationChangeEmail } from "@/modules/auth/api/change-email";
import { useMutationCheckEmailAvailability } from "@/modules/auth/api/check-email-availability";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { signOut } from "@/modules/auth/utils/auth";
import { useAppForm } from "@/modules/form/app-form";
import { Field } from "@/modules/form/field";
import { SendSecurityCodeField } from "@/modules/form/form-fields/send-security-code-field";
import { validateEmail } from "@/utils/regex/validate-email";

export const changeEmailSchema = z.object({
	securityCode: z.string().max(6).min(6),
	newEmail: validateEmail,
	confirmEmail: validateEmail,
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
			{currentStep === 1 && <SendSecurityCodeField onSendCode={nextStep} placeholder="markin@example.com" purpose="EMAIL_CHANGE" />}
			{currentStep === 2 && (
				<form onSubmit={nextStep}>
					<Form.AppField
						children={(AppFields) => {
							return (
								<Field.Wrapper className="items-center">
									<Field.Label>
										<MailCheckIcon /> Só mais uma coisinha!
									</Field.Label>
									<AppFields.ConfirmCodeField />
									<Field.Description>Enviamos um codigo de 6 digitos para o seu email!</Field.Description>
									<Form.AppForm>
										<AppFields.StepButtons />
									</Form.AppForm>
								</Field.Wrapper>
							);
						}}
						name="securityCode"
					/>
				</form>
			)}
			{currentStep === 3 && (
				<form
					className="w-full space-y-2"
					onSubmit={(e) => {
						e.preventDefault();
						Form.handleSubmit();
					}}
				>
					<Form.AppField
						children={(AppFields) => {
							return (
								<Field.Wrapper>
									<Field.Label>Novo email: </Field.Label>
									<AppFields.TextField autoComplete="email" maxLength={255} />
								</Field.Wrapper>
							);
						}}
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
					/>
					<Form.AppField
						children={(AppFields) => {
							return (
								<Field.Wrapper>
									<Field.Label>Confirme o email: </Field.Label>
									<AppFields.TextField autoComplete="email" maxLength={255} />
									<Field.Error />
									<Form.AppForm>
										<AppFields.StepButtons lastButtonText="Alterar senha" />
									</Form.AppForm>
								</Field.Wrapper>
							);
						}}
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
					/>
				</form>
			)}
		</div>
	);
}
