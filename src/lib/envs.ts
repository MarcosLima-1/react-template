import { z } from "zod/v4";

const envSchema = z.object({
	VITE_IS_DEVELOPMENT: z.string().transform((val) => val === "true"),
	VITE_DEV_MODE: z.string().transform((val) => val === "true"),
	VITE_URL_API: z.url(),
	VITE_WEB_VERSION: z.string().min(1),
	VITE_GOOGLE_CLIENT_ID: z.string().min(1),
});

export const envs = envSchema.parse(import.meta.env);
export type Envs = z.infer<typeof envSchema>;
