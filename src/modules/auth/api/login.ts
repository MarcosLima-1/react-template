import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { envs } from "@/lib/envs";
import type { LoginSchema } from "@/modules/auth/components/login-form";
import type { AuthResponse } from "@/modules/auth/types/auth";
import type { ApiResponse } from "@/types/response";
import type { TanstackMetaTags } from "@/types/tanstack-meta";
import { createMockUser } from "@/types/user";

async function login(props: LoginSchema): Promise<ApiResponse<AuthResponse>> {
	if (envs.VITE_OFFLINE_MODE) {
		return {
			data: {
				accessToken: "123",
				user: createMockUser(),
			},
		};
	}

	const { data } = await api.post<ApiResponse<AuthResponse>>(`/auth/login`, props);

	return data;
}

const meta = {
	method: ["POST"],
	desc: "Realiza o processo de autenticação (login) do usuário.",
	errorMessage: "Falha ao fazer login. Verifique suas credenciais.",
} satisfies TanstackMetaTags;

export function useMutationLogin() {
	return useMutation({
		mutationKey: ["Login"],
		mutationFn: login,
		meta,
	});
}
