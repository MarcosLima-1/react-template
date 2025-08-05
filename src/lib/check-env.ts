import { z } from "zod/v4";

export function checkEnv() {
	const envSchema = z.object({
		VITE_IS_DEVELOPMENT: z.string().transform((val) => val === "true"),
		VITE_URL_API: z.url(),
		VITE_URL_API_DEV: z.url(),
		VITE_DISCORD_ERROR_WEBHOOK: z.url(),
	});

	const { success } = envSchema.safeParse(import.meta.env);

	if (!success) {
		throw new Error("❌ Invalid environment variables");
	}
}
