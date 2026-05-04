import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

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
