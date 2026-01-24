import { z } from "zod/v4";

const envSchema = z.object({
	VITE_ENVIRONMENT: z.enum(["development", "production"]).default("production"),
	// ? Alternar a visibilidade das ferramentas de desenvolvimento
	VITE_DEV_MODE: z
		.string()
		.transform((val) => val === "true")
		.default(false),
	VITE_URL_API: z.url(),
	VITE_WEB_VERSION: z.string().min(5),
	VITE_GOOGLE_CLIENT_ID: z.string(),

	// ? Sentry envs para relatórios de erros
	VITE_SENTRY_DSN: z.url(),
	VITE_SENTRY_URL: z.url(),
	VITE_SENTRY_ORG: z.string(),
	VITE_SENTRY_PROJECT: z.string(),
	VITE_SENTRY_AUTH_TOKEN: z.string(),
});

export const env = envSchema.parse(import.meta.env);
export type Env = z.infer<typeof envSchema>;
