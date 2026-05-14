import * as Sentry from "@sentry/react";
import { clientEnv } from "@/lib/env/client";

Sentry.init({
	dsn: clientEnv.VITE_SENTRY_DSN,
	release: clientEnv.VITE_WEB_VERSION,
	environment: clientEnv.VITE_ENVIRONMENT,
	sendDefaultPii: true,
	enableLogs: true,
});

export { Sentry };
