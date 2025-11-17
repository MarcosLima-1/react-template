import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		devtools({
			removeDevtoolsOnBuild: true,
		}),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			quoteStyle: "double",
			generatedRouteTree: "./src/types/routeTree.generated.ts",
		}),
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		viteReact({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		Inspect({}),
		visualizer({
			open: true,
			filename: "bundle-analysis.html",
			sourcemap: true,
		}),
	],
	build: {
		sourcemap: true,
	},
	server: {
		port: 3000,
		host: true,
		open: true,
	},
});
