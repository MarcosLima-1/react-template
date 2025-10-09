import { MailCheckIcon } from "lucide-react";
import { z } from "zod/v4";
import { useMutationChangePassword } from "@/modules/auth/api/change-password";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { validatePassword } from "@/modules/auth/types/register";
import { signOut } from "@/modules/auth/utils/auth";
import { useAppForm } from "@/modules/form/app-form";
import { FieldDescription } from "@/modules/form/field-description";
import { FieldErros } from "@/modules/form/field-erros";
import { FieldLabel } from "@/modules/form/field-label";
import { FieldWrapper } from "@/modules/form/field-wrapper";
import { SendSecurityCodeField } from "@/modules/form/fields/send-security-code-field";

export const changePasswordSchema = z.object({
	securityCode: z.string().max(6).min(6),
	newPassword: validatePassword,
	confirmPassword: validatePassword,
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
	const { currentStep, nextStep } = useFormStepContext();
	const { mutateAsync: changePassword } = useMutationChangePassword();

	const defaultValues: ChangePasswordSchema = {
		securityCode: "",
		newPassword: "",
		confirmPassword: "",
	};

	const Form = useAppForm({
		validators: {
			onChange: changePasswordSchema,
			onMount: changePasswordSchema,
			onSubmit: changePasswordSchema,
		},
		defaultValues,
		onSubmit: ({ value }) => onSubmit(value),
	});

	async function onSubmit({ newPassword, securityCode }: ChangePasswordSchema) {
		await changePassword({
			securityCode,
			newPassword,
		});

		signOut();
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-6">
			{currentStep === 1 && <SendSecurityCodeField placeholder="markin@example.com" purpose="PASSWORD_CHANGE" onSendCode={nextStep} />}
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
						name="newPassword"
						children={(Field) => {
							return (
								<FieldWrapper>
									<FieldLabel>Senha: </FieldLabel>
									<Field.PasswordField maxLength={100} />
									<FieldErros />
								</FieldWrapper>
							);
						}}
					/>
					<Form.AppField
						name="confirmPassword"
						validators={{
							onChangeListenTo: ["newPassword"],
							onChange: ({ value, fieldApi }) => {
								if (value !== fieldApi.form.getFieldValue("newPassword")) {
									return [new Error("Senhas não coincidem!")];
								}
								return undefined;
							},
						}}
						children={(Field) => {
							return (
								<FieldWrapper>
									<FieldLabel>Confirme a senha: </FieldLabel>
									<Field.PasswordField maxLength={100} />
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
