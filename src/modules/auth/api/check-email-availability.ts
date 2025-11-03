import { useMutation } from "@tanstack/react-query";
import { publicApi } from "@/lib/axios";
import type { ApiResponse } from "@/schemas/response";

interface CheckEmailAvailabilityRequest {
	email: string;
}

interface CheckEmailAvailabilityResponse {
	isAvailable: boolean;
}

async function checkEmailAvailability({ email }: CheckEmailAvailabilityRequest) {
	const { data } = await publicApi.get<ApiResponse<CheckEmailAvailabilityResponse>>(`/auth/email/${email}/available`);
	return data;
}

export function useMutationCheckEmailAvailability() {
	return useMutation({
		mutationKey: ["checkEmailAvailability"],
		mutationFn: checkEmailAvailability,
		meta: {
			method: ["GET"],
			title: "Verificar Disponibilidade de E-mail",
			desc: "Verifica se um endereço de e-mail está disponível para uso.",
			errorMessage: "Falha ao verificar a disponibilidade do e-mail. Por favor, tente novamente.",
		},
	});
}
