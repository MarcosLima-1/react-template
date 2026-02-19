import { z } from "zod/v4";
import { useMutationCheckEmailAvailability } from "@/modules/auth/api/check-email-availability";
import { useMutationRegister } from "@/modules/auth/api/register";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { saveTempMailInStorage } from "@/modules/auth/storage/temp-mail";
import { Field } from "@/modules/form/components/field";
import { useAppForm } from "@/modules/form/lib/app-form";
import { validateEmail } from "@/utils/validators/validate-email";
import { validatePassword } from "@/utils/validators/validate-password";

export const registerSchema = z.object({
	email: validateEmail,
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
				children={(AppFields) => {
					return (
						<Field.Wrapper>
							<Field.Label>Email: </Field.Label>
							<AppFields.TextField placeholder="markin@example.com" maxLength={255} />
						</Field.Wrapper>
					);
				}}
			/>

			<Form.AppField
				name="password"
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
			<Form.AppForm>
				<Form.SubmitButton className="mt-4 w-full" size="lg">
					Registrar
				</Form.SubmitButton>
			</Form.AppForm>
		</form>
	);
}
