import { z } from "zod/v4";
import { useMutationCheckEmailAvailability } from "@/modules/auth/api/check-email-availability";
import { useMutationRegister } from "@/modules/auth/api/register";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { saveTempMailInStorage } from "@/modules/auth/storage/temp-mail/temp-mail";
import { validatePassword, valideateEmail } from "@/modules/auth/types/register";
import { useAppForm } from "@/modules/form/app-form";
import { FieldErros } from "@/modules/form/field-erros";
import { FieldLabel } from "@/modules/form/field-label";
import { FieldWrapper } from "@/modules/form/field-wrapper";

export const registerSchema = z.object({
	email: valideateEmail,
	password: validatePassword,
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
	const { mutateAsync: CheckEmailAvailability } = useMutationCheckEmailAvailability();
	const { nextStep } = useFormStepContext();
	const { mutateAsync: register } = useMutationRegister();

	const Form = useAppForm({
		validators: {
			onChange: registerSchema,
			onMount: registerSchema,
			onSubmit: registerSchema,
		},
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: ({ value }) => onSubmit(value),
	});

	async function onSubmit(data: RegisterSchema) {
		await register(data);
		saveTempMailInStorage(data.email);
		nextStep();
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				Form.handleSubmit();
			}}
			className="w-full space-y-2"
		>
			<Form.AppField
				name="email"
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
							<FieldLabel>Email: </FieldLabel>
							<Field.TextField placeholder="markin@example.com" maxLength={255} />
						</FieldWrapper>
					);
				}}
			/>

			<Form.AppField
				name="password"
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
			<Form.AppForm>
				<Form.SubmitButton className="mt-4 w-full" size="lg">
					Registrar
				</Form.SubmitButton>
			</Form.AppForm>
		</form>
	);
}
