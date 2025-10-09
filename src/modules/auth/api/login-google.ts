import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { AuthResponse } from "@/modules/auth/types/auth";
import type { ApiResponse } from "@/types/response";
import type { TanstackMetaTags } from "@/types/tanstack-meta";

interface LoginGoogleRequest {
	token: string;
}

async function loginGoogle(props: LoginGoogleRequest) {
	const { data } = await api.post<ApiResponse<AuthResponse>>(`/auth/google`, props);

	return data;
}

const meta = {
	method: ["POST"],
	desc: "Realiza o login ou registro através da conta Google.",
	errorMessage: "Falha na autenticação com Google. Por favor, tente novamente.",
} satisfies TanstackMetaTags;

export function useMutationLoginGoogle() {
	return useMutation({
		mutationKey: ["LoginGoogle"],
		mutationFn: loginGoogle,
		meta,
	});
}
