import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { RegisterSchema } from "@/modules/auth/components/register-form";
import type { TanstackMetaTags } from "@/types/tanstack-meta";

async function register(props: RegisterSchema) {
	await api.post(`/auth/register`, props);
}

const meta = {
	method: ["POST"],
	desc: "Realiza o processo de autenticação (register) do usuário.",
	errorMessage: "Falha ao fazer register. Verifique suas credenciais.",
} satisfies TanstackMetaTags;

export function useMutationRegister() {
	return useMutation({
		mutationKey: ["Register"],
		mutationFn: register,
		meta,
	});
}
