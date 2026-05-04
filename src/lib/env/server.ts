import z from "zod/v4";
import { clientEnvSchema } from "@/lib/env/client";

const envSchema = clientEnvSchema.extend({
	SENTRY_AUTH_TOKEN: z.string(),
});

export const serverEnv = envSchema.parse(process.env);
