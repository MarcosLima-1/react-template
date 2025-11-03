import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface ChangePasswordRequest {
	securityCode: string;
	newPassword: string;
}

async function changePassword(props: ChangePasswordRequest) {
	await api.post(`/auth/change-password`, props);
}

export function useMutationChangePassword() {
	return useMutation({
		mutationKey: ["changePassword"],
		mutationFn: changePassword,
		meta: {
			method: ["POST"],
			title: "Alterar Senha",
			desc: "Altera a senha do usuário utilizando um código de segurança.",
			errorMessage: "Falha ao alterar a senha. Verifique o código e a nova senha.",
			successMessage: "Senha alterada com sucesso!",
		},
	});
}
