import { z } from "zod/v4";

const envSchema = z.object({
	VITE_IS_DEVELOPMENT: z.string().transform((val) => val === "true"),
	VITE_DEV_MODE: z.string().transform((val) => val === "true"),
	VITE_URL_API: z.url(),
	VITE_URL_API_DEV: z.url(),
	VITE_WEB_VERSION: z.string().min(1),
});
export function checkEnv() {
	const { success } = envSchema.safeParse(import.meta.env);

	if (!success) {
		throw new Error("❌ Invalid environment variables");
	}
}

export const envs = envSchema.parse(import.meta.env);
export type Envs = z.infer<typeof envSchema>;
