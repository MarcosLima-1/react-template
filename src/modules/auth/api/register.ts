import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { RegisterSchema } from "@/modules/auth/components/register-form";

async function register(props: RegisterSchema) {
	await api.post(`/auth/register`, props);
}

export function useMutationRegister() {
	return useMutation({
		mutationKey: ["Register"],
		mutationFn: register,
		meta: {
			method: ["POST"],
			title: "Register",
			desc: "Realiza o processo de autenticação (register) do usuário.",
			errorMessage: "Falha ao fazer register. Verifique suas credenciais.",
		},
	});
}
