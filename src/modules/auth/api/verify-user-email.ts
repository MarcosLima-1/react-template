import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { AuthResponse } from "@/modules/auth/types/auth";
import type { ApiResponse } from "@/schemas/response";

interface VerifyUserEmailRequest {
	securityCode: string;
}

async function verifyUserEmail(props: VerifyUserEmailRequest) {
	const { data } = await api.post<ApiResponse<AuthResponse>>(`/auth/verify-email`, props);
	return data;
}

export function useMutationVerifyUserEmail() {
	return useMutation({
		mutationKey: ["verifyUserEmail"],
		meta: {
			method: ["POST"],
			title: "Verificar E-mail",
			desc: "Verifica o e-mail do usuário usando um código de segurança.",
			errorMessage: "Falha ao verificar o e-mail. Código inválido ou expirado.",
		},
		mutationFn: verifyUserEmail,
	});
}
