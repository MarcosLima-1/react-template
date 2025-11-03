import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export type SecurityCodePurpose = "EMAIL_VERIFICATION" | "ACCOUNT_DELETION" | "EMAIL_CHANGE" | "PASSWORD_CHANGE";

interface RequestSecurityCodeRequest {
	email: string;
	purpose: SecurityCodePurpose;
}

async function requestSecurityCode(props: RequestSecurityCodeRequest) {
	await api.post(`/auth/security-code`, props);
}

export function useMutationRequestSecurityCode() {
	return useMutation({
		mutationKey: ["requestSecurityCode"],
		meta: {
			method: ["POST"],
			title: "Request Security Code",
			desc: "Envia um código de confirmação para o endereço de e-mail informado.",
			errorMessage: "Falha ao enviar o código de confirmação. Por favor, tente novamente.",
			successMessage: "Código de confirmação enviado com sucesso!",
		},
		mutationFn: requestSecurityCode,
	});
}
