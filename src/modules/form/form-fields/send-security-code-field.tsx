import type { ComponentProps } from "react";
import { z } from "zod/v4";
import type { Input } from "@/components/ui/input";
import { type SecurityCodePurpose, useMutationRequestSecurityCode } from "@/modules/auth/api/request-security-code.ts";
import { useAppForm } from "@/modules/form/app-form";
import { Field } from "@/modules/form/field/index";
import { cn } from "@/utils/cn.ts";
import { ALLOWED_DOMAINS } from "@/utils/validators/validate-email";

interface SendSecurityCodeFieldProps extends ComponentProps<typeof Input> {
	disableCharCounter?: boolean;
	purpose: SecurityCodePurpose;
	onSendCode: () => void;
}

const validateEmailSchema = z.object({
	email: z
		.email("Email inválido!")
		.trim()
		.toLowerCase()
		.refine((email) => {
			return ALLOWED_DOMAINS.some((domain) => email.endsWith(`@${domain}`));
		}, "Este domínio de email não é permitido."),
});

type ValidateEmailSchema = z.infer<typeof validateEmailSchema>;

export function SendSecurityCodeField({
	maxLength = 255,
	onSendCode,
	disableCharCounter,
	className,
	purpose,
	...props
}: SendSecurityCodeFieldProps) {
	const { mutateAsync: requestSecurityCode } = useMutationRequestSecurityCode();

	const Form = useAppForm({
		validators: {
			onChange: validateEmailSchema,
			onMount: validateEmailSchema,
			onSubmit: validateEmailSchema,
		},
		defaultValues: {
			email: "",
		},
		onSubmit: ({ value }) => handleSendCode(value),
	});

	async function handleSendCode({ email }: ValidateEmailSchema) {
		await requestSecurityCode({
			email,
			purpose,
		});

		onSendCode();
	}

	return (
		<form
			className={cn(className, "relative w-full space-y-4")}
			onSubmit={(e) => {
				e.preventDefault();
				Form.handleSubmit();
			}}
		>
			<Form.AppField
				children={(AppFields) => {
					return (
						<Field.Wrapper>
							<AppFields.TextField autoComplete="email" disableCharCounter={disableCharCounter} maxLength={maxLength} {...props} />
							<Field.Error />
						</Field.Wrapper>
					);
				}}
				name="email"
			/>
			<Form.AppForm>
				<Form.SubmitButton className="w-full">Enviar codigo</Form.SubmitButton>
			</Form.AppForm>
		</form>
	);
}
