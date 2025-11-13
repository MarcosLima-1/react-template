import z from "zod/v4";

export const USERNAME_REGEXP = /^[a-z0-9_-]+$/;

export const validateUsername = z
	.string()
	.min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres." })
	.max(20, { message: "O nome de usuário deve ter no máximo 20 caracteres." })
	.regex(USERNAME_REGEXP, {
		message: "O nome de usuário deve conter apenas letras minúsculas, números, traços e sublinhados.",
	});
