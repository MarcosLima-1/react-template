import { z } from "zod/v4";

const envSchema = z.object({
	VITE_DEV_MODE: z.string().transform((val) => val === "true"),
	VITE_OFFLINE_MODE: z.string().transform((val) => val === "true"),
	VITE_URL_API: z.url(),
	VITE_WEB_VERSION: z.string().min(1),
	VITE_GOOGLE_CLIENT_ID: z.string().min(1),
});

export const env = envSchema.parse(import.meta.env);
export type Env = z.infer<typeof envSchema>;
