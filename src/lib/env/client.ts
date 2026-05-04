import { z } from "zod/v4";

export const clientEnvSchema = z.object({
	VITE_ENVIRONMENT: z.enum(["development", "production", "test"]).default("production"),

	VITE_DEV_MODE: z
		.string()
		.transform((val) => val === "true")
		.default(false), // ? Alternar a visibilidade das ferramentas de desenvolvimento
	VITE_WEB_VERSION: z.string().min(5),
	VITE_API_URL: z.url(),
	// ? Sentry envs para relatórios de erros
	VITE_SENTRY_DSN: z.url(),
	VITE_SENTRY_URL: z.url(),
	VITE_SENTRY_ORG: z.string(),
	VITE_SENTRY_PROJECT: z.string(),
});

export const clientEnv = clientEnvSchema.parse(import.meta.env);
