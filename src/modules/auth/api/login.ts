import { api } from "@/lib/axios";
import type { LoginSchema } from "@/modules/auth/components/login-form";
import type { AuthResponse } from "@/modules/auth/types/auth";
import type { ApiResponse } from "@/schemas/response";
import { useMutation } from "@tanstack/react-query";

async function login(props: LoginSchema): Promise<ApiResponse<AuthResponse>> {
	const { data } = await api.post<ApiResponse<AuthResponse>>("/auth/login", props);

	return data;
}

export function useMutationLogin() {
	return useMutation({
		mutationKey: ["Login"],
		mutationFn: login,
		meta: {
			method: ["POST"],
			title: "Login",
			desc: "Realiza o processo de autenticação (login) do usuário.",
		},
	});
}
