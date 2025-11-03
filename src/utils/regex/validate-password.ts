import z from "zod/v4";

export const ONEUPPER_REGEXP = /^(?=.*?[A-Z])/;
export const ONELOWER_REGEXP = /^(?=.*?[a-z])/;
export const ONENUMBER_REGEXP = /^(?=.*?[0-9])/;
export const LEAST6_REGEXP = /^.{6,}$/;
export const NOSPACE_REGEXP = /^[^\s]*$/;
export const SPECIAL_CHAR_REGEXP = /[^A-Za-z0-9]/;

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
