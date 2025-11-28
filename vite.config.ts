import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(async ({ mode }) => {
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
	];

	if (env.VITE_DEV_MODE === "true") {
		const { visualizer } = await import("rollup-plugin-visualizer");

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
			sourcemap: true,
			outDir: "./build/frontend",
			reportCompressedSize: true,
			rollupOptions: {
				external: ["react-scan"],
				output: {
					manualChunks: (id: string) => {
						if (id.includes("zod")) return "zod";

						// Outras libs grandes que mudam raramente
						if (id.includes("node_modules/react")) return "react";
						if (id.includes("node_modules/react-dom")) return "react-dom";

						// Bibliotecas de UI (se usar)
						if (id.includes("node_modules/@radix-ui")) {
							return "ui-lib";
						}

						// Validações de formulário (agrupa com Zod)
						if (id.includes("validation") || id.includes("schema")) {
							return "validation";
						}
					},
				},
			},
		},
		server: {
			host: true,
			open: true,
		},
	};
});
