import * as Sentry from "@sentry/react";
import { env } from "@/lib/env";

Sentry.init({
	dsn: env.VITE_SENTRY_DSN,
	release: env.VITE_WEB_VERSION,
	environment: env.VITE_ENVIRONMENT,
	sendDefaultPii: true,
	enableLogs: true,
});
