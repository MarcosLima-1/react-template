import { isAxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod/v4";
import { useMutationLogin } from "@/modules/auth/api/login";
import { useFormStepContext } from "@/modules/auth/context/step-form-context";
import { saveTempMailInStorage } from "@/modules/auth/storage/temp-mail";
import { signIn } from "@/modules/auth/utils/auth";
import { useAppForm } from "@/modules/form/app-form";
import { Field } from "@/modules/form/field";

export const loginSchema = z.object({
	email: z.email(),
	password: z.string(),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
	const { nextStep } = useFormStepContext();
	const { mutateAsync: login, isError, error } = useMutationLogin();

	useEffect(() => {
		if (!isAxiosError(error)) return;

		if (isError && error.response?.status !== 500) {
			toast.error("Credenciais inválidas!");
		}
	}, [error, isError]);

	const Form = useAppForm({
		validators: {
			onChange: loginSchema,
			onMount: loginSchema,
			onSubmit: loginSchema,
		},
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: ({ value }) => onSubmit(value),
	});

	async function onSubmit({ email, password }: LoginSchema) {
		const { data } = await login({ email, password });
		const { accessToken, user } = data;

		if (user.status === "EMAIL_CONFIRMATION_PENDING") {
			saveTempMailInStorage(email);
			nextStep();
			return;
		}

		if (user.status === "INACTIVE") {
			toast.error("Conta banida!");
			return;
		}

		signIn({ accessToken, session: { user } });
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
				children={(AppFields) => {
					return (
						<Field.Wrapper>
							<Field.Label>Email: </Field.Label>
							<AppFields.TextField maxLength={255} placeholder="markin@example.com" />
							<Field.Error />
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
							<AppFields.PasswordField />
							<Field.Error />
						</Field.Wrapper>
					);
				}}
			/>
			<Form.AppForm>
				<Form.SubmitButton className="mt-4 w-full">Entrar</Form.SubmitButton>
			</Form.AppForm>
		</form>
	);
}
