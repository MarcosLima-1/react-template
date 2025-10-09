import { useMutation } from "@tanstack/react-query";
import { publicApi } from "@/lib/axios";
import type { ApiResponse } from "@/types/response";
import type { TanstackMetaTags } from "@/types/tanstack-meta";

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

const meta = {
	method: ["GET"],
	desc: "Verifica se um endereço de e-mail está disponível para uso.",
	errorMessage: "Falha ao verificar a disponibilidade do e-mail. Por favor, tente novamente.",
} satisfies TanstackMetaTags;

export function useMutationCheckEmailAvailability() {
	return useMutation({
		mutationKey: ["checkEmailAvailability"],
		meta,
		mutationFn: checkEmailAvailability,
	});
}
