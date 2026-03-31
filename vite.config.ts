import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// TODO: Add sentry plugin back when we have the Sentry project set up

export default defineConfig(({ mode }) => {
	// const env = loadEnv(mode, process.cwd(), "");

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
		// sentryVitePlugin({
		// 	url: env.VITE_SENTRY_URL,
		// 	authToken: env.VITE_SENTRY_AUTH_TOKEN,
		// 	org: env.VITE_SENTRY_ORG,
		// 	project: env.VITE_SENTRY_PROJECT,
		// 	telemetry: false,
		// }),
	];

	// if (env.VITE_DEV_MODE === "true") {
	// 	plugins.push(
	// 		visualizer({
	// 			open: true,
	// 			filename: "./build/bundle-analysis.html",
	// 			sourcemap: true,
	// 			gzipSize: true,
	// 			brotliSize: true,
	// 		}),
	// 	);
	// }

	return {
		plugins,
		build: {
			sourcemap: "hidden",
			outDir: "./build/frontend",
			reportCompressedSize: true,
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
