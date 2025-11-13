import { MailCheckIcon } from "lucide-react";
import { z } from "zod/v4";
import { useMutationChangePassword } from "@/modules/auth/api/change-password";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { signOut } from "@/modules/auth/utils/auth";
import { useAppForm } from "@/modules/form/app-form";
import { Field } from "@/modules/form/field";
import { SendSecurityCodeField } from "@/modules/form/form-fields/send-security-code-field";
import { validatePassword } from "@/utils/validators/validate-password";

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
						children={(AppFields) => {
							return (
								<Field.Wrapper>
									<Field.Label>Senha: </Field.Label>
									<AppFields.PasswordField maxLength={100} />
									<Field.Error />
								</Field.Wrapper>
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
						children={(AppFields) => {
							return (
								<Field.Wrapper>
									<Field.Label>Confirme a senha: </Field.Label>
									<AppFields.PasswordField maxLength={100} />
									<Field.Error />
									<Form.AppForm>
										<AppFields.StepButtons lastButtonText="Alterar senha" />
									</Form.AppForm>
								</Field.Wrapper>
							);
						}}
					/>
				</form>
			)}
		</div>
	);
}
