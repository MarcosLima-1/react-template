import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";


const ReactCompilerConfig = {
	target: "19",
};

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			quoteStyle: "double",
		}),
		tailwindcss(),
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
		Inspect({}),
		visualizer({
			open: true,
			filename: "bundle-analysis.html",
			sourcemap: true,
		}),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	build: {
		sourcemap: true,
		cssMinify: "lightningcss",
		minify: "terser",
	},
	server: {
		port: 3000,
		host: true,
		open: true,
	},
});
