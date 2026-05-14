import babel from "@rolldown/plugin-babel";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { clientEnv } from "@/lib/env/client";
import { serverEnv } from "@/lib/env/server";
export default defineConfig(() => {
	const plugins = [
		devtools({
			removeDevtoolsOnBuild: true,
		}),
		tanstackStart({
			router: { generatedRouteTree: "./types/routeTree.generated.ts", quoteStyle: "double" },
		}),
		nitro({ output: { dir: "./build/frontend" }, preset: "bun" }),
		tailwindcss(),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] }),
		sentryVitePlugin({
			url: clientEnv.VITE_SENTRY_URL,
			authToken: serverEnv.SENTRY_AUTH_TOKEN,
			org: clientEnv.VITE_SENTRY_ORG,
			project: clientEnv.VITE_SENTRY_PROJECT,
			telemetry: false,
			sourcemaps: {
				// As you're enabling client source maps, you probably want to delete them after they're uploaded to Sentry.
				// Set the appropriate glob pattern for your output folder - some glob examples below:
				filesToDeleteAfterUpload: ["./**/*.map", ".*/**/public/**/*.map", "./dist/**/client/**/*.map"],
			},
		}),
	];

	return {
		plugins,
		build: {
			sourcemap: true,
			outDir: "./build/frontend",
			reportCompressedSize: true,
			rollupOptions: {
				external: ["zlib-sync"],
			},
		},
		resolve: {
			tsconfigPaths: true,
		},
		server: {
			host: true,
			open: true,
		},
	};
});
