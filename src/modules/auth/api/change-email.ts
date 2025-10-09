import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { TanstackMetaTags } from "@/types/tanstack-meta";

interface ChangeEmailRequest {
	securityCode: string;
	newEmail: string;
}

async function changeEmail(props: ChangeEmailRequest) {
	await api.post(`/auth/change-email`, props);
}

const meta = {
	method: ["POST"],
	desc: "Altera o e-mail do usuário utilizando um código de segurança.",
	errorMessage: "Falha ao alterar o e-mail. Verifique o código e a nova senha.",
	successMessage: "E-mail alterado com sucesso!",
} satisfies TanstackMetaTags;

export function useMutationChangeEmail() {
	return useMutation({
		mutationKey: ["changeEmail"],
		meta,
		mutationFn: changeEmail,
	});
}
