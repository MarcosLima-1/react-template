import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	const plugins = [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			quoteStyle: "double",
			generatedRouteTree: "./src/types/routeTree.generated.ts",
		}),
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		devtools({
			removeDevtoolsOnBuild: true,
		}),
		tailwindcss(),
		viteReact({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		sentryVitePlugin({
			url: env.VITE_SENTRY_URL,
			authToken: env.VITE_SENTRY_AUTH_TOKEN,
			org: env.VITE_SENTRY_ORG,
			project: env.VITE_SENTRY_PROJECT,
			telemetry: false,
		}),
	];

	if (env.VITE_DEV_MODE === "true") {
		plugins.push(
			visualizer({
				open: true,
				filename: "./build/bundle-analysis.html",
				sourcemap: true,
				gzipSize: true,
				brotliSize: true,
			}),
		);
	}

	return {
		plugins,
		build: {
			sourcemap: "hidden",
			outDir: "./build/frontend",
			reportCompressedSize: true,
			rollupOptions: {
				external: ["react-scan"],
			},
		},
		server: {
			host: true,
			open: true,
		},
	};
});
