import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { TanstackMetaTags } from "@/types/tanstack-meta";

interface ChangePasswordRequest {
	securityCode: string;
	newPassword: string;
}

async function changePassword(props: ChangePasswordRequest) {
	await api.post(`/auth/change-password`, props);
}

const meta = {
	method: ["POST"],
	desc: "Altera a senha do usuário utilizando um código de segurança.",
	errorMessage: "Falha ao alterar a senha. Verifique o código e a nova senha.",
	successMessage: "Senha alterada com sucesso!",
} satisfies TanstackMetaTags;

export function useMutationChangePassword() {
	return useMutation({
		mutationKey: ["changePassword"],
		meta,
		mutationFn: changePassword,
	});
}
