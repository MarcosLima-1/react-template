import { ArrowBigUpIcon, MailCheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod/v4";
import { Button } from "@/components/ui/button";
import { type SecurityCodePurpose, useMutationRequestSecurityCode } from "@/modules/auth/api/request-security-code";
import { useMutationVerifyUserEmail } from "@/modules/auth/api/verify-user-email";
import { deleteStorageTempMail } from "@/modules/auth/storage/temp-mail/temp-mail";
import { signIn } from "@/modules/auth/utils/auth";
import { useAppForm } from "@/modules/form/app-form";
import { FieldDescription } from "@/modules/form/field-description";
import { FieldLabel } from "@/modules/form/field-label";
import { FieldWrapper } from "@/modules/form/field-wrapper";
import { cn } from "@/utils/cn";

const emailVerificationCodeSchema = z.object({
	code: z
		.string()
		.length(6, { message: "Your one-time password must be 6 digits." })
		.regex(/^\d+$/, { message: "Your one-time password must contain only digits." }),
});
type EmailVerificationCodeSchema = z.infer<typeof emailVerificationCodeSchema>;

interface EmailVerificationFormProps {
	className?: string;
	purpose: SecurityCodePurpose;
	email: string | null;
}

export function EmailVerificationForm({ email, purpose, className }: EmailVerificationFormProps) {
	const [isResendInCooldown, setIsResendInCoolDown] = useState(false);
	const { mutateAsync: verifyUserEmail, isPending } = useMutationVerifyUserEmail();
	const { mutateAsync: requestSecurityCode } = useMutationRequestSecurityCode();

	const defaultValues: EmailVerificationCodeSchema = {
		code: "",
	};

	const Form = useAppForm({
		validators: {
			onChange: emailVerificationCodeSchema,
			onSubmit: emailVerificationCodeSchema,
			onMount: emailVerificationCodeSchema,
		},
		defaultValues,
		onSubmit: ({ value }) => handleConfirmEmail(value),
	});

	async function handleConfirmEmail({ code }: EmailVerificationCodeSchema) {
		const { data } = await verifyUserEmail({
			securityCode: code,
		});

		const { accessToken, user } = data;

		deleteStorageTempMail();

		signIn({ accessToken, session: { user } });
	}

	async function handleResendEmail() {
		if (isResendInCooldown) return;

		setIsResendInCoolDown(true);

		if (!email) {
			toast.error("Email não especificado!");
			return;
		}
		setTimeout(() => {
			setIsResendInCoolDown(false);
		}, 1000 * 1);

		await requestSecurityCode({ email, purpose });
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				Form.handleSubmit();
			}}
			className={cn("flex flex-col items-center space-y-8", className)}
		>
			<Form.AppField
				name="code"
				children={(Field) => (
					<FieldWrapper className="items-center">
						<FieldLabel>
							<MailCheckIcon /> Só mais uma coisinha!
						</FieldLabel>
						<Field.ConfirmCodeField />
						<FieldDescription>Enviamos um codigo de 6 digitos para o seu email!</FieldDescription>
						<FieldDescription>
							Não recebeu?
							<span>
								<Button
									disabled={isResendInCooldown || isPending}
									onClick={handleResendEmail}
									type="button"
									className="ml-2 p-0 font-medium text-primary text-xs"
									variant="link"
								>
									clique aqui!
								</Button>
							</span>
						</FieldDescription>
					</FieldWrapper>
				)}
			/>
			<Form.AppForm>
				<Form.SubmitButton>
					<ArrowBigUpIcon /> Enviar
				</Form.SubmitButton>
			</Form.AppForm>
		</form>
	);
}
