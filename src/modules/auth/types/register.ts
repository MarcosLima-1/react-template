import { z } from "zod/v4";
import { ALLOWED_DOMAINS } from "@/utils/regex/validate-email";
import { NOSPACE_REGEXP, ONELOWER_REGEXP, ONENUMBER_REGEXP, ONEUPPER_REGEXP, SPECIAL_CHAR_REGEXP } from "@/utils/regex/validate-password";

export const valideateEmail = z
	.email("E-mail inválido.")
	.trim()
	.toLowerCase()
	.refine((email) => {
		return ALLOWED_DOMAINS.some((domain) => email.endsWith(`@${domain}`));
	}, "Este domínio de email não é permitido.");
export const validatePassword = z
	.string()
	.min(6, { message: "A senha deve ter pelo menos 6 caracteres." })
	.max(100, { message: "A senha deve ter no máximo 100 caracteres." })
	.regex(ONEUPPER_REGEXP, {
		message: "A senha deve conter pelo menos uma letra maiúscula.",
	})
	.regex(ONELOWER_REGEXP, {
		message: "A senha deve conter pelo menos uma letra minúscula.",
	})
	.regex(ONENUMBER_REGEXP, {
		message: "A senha deve conter pelo menos um número.",
	})
	.regex(NOSPACE_REGEXP, {
		message: "A senha não pode conter espaços.",
	})
	.regex(SPECIAL_CHAR_REGEXP, {
		message: "A senha deve conter pelo menos um caractere especial.",
	});
