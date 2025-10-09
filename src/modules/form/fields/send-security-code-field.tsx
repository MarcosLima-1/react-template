import type { ComponentProps } from "react";
import { z } from "zod/v4";
import type { Input } from "@/components/ui/input.tsx";
import { type SecurityCodePurpose, useMutationRequestSecurityCode } from "@/modules/auth/api/request-security-code.ts";
import { FieldErros } from "@/modules/form/field-erros.tsx";
import { FieldWrapper } from "@/modules/form/field-wrapper.tsx";
import { cn } from "@/utils/cn.ts";
import { ALLOWED_DOMAINS } from "@/utils/regex/validate-email.ts";
import { useAppForm } from "../app-form.tsx";

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
			onSubmit={(e) => {
				e.preventDefault();
				Form.handleSubmit();
			}}
			className={cn(className, "relative w-full space-y-4")}
		>
			<Form.AppField
				name="email"
				children={(Field) => {
					return (
						<FieldWrapper>
							<Field.TextField autoComplete="email" disableCharCounter={disableCharCounter} maxLength={maxLength} {...props} />
							<FieldErros />
						</FieldWrapper>
					);
				}}
			/>
			<Form.AppForm>
				<Form.SubmitButton className="w-full">Enviar codigo</Form.SubmitButton>
			</Form.AppForm>
		</form>
	);
}
