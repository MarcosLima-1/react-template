import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	test: {
		alias: {
			"@": "/src",
		},
		projects: [
			{
				extends: true,
				test: {
					name: "unit",
					include: ["src/**/*.spec.ts"],
					environment: "node",
				},
			},
			{
				extends: true,
				optimizeDeps: {
					include: [
						"@react-oauth/google",
						"@tanstack/react-devtools",
						"@tanstack/react-form-devtools",
						"@tanstack/react-query",
						"@tanstack/react-query-devtools",
						"@tanstack/react-router",
						"@tanstack/react-router-devtools",
						"@sentry/react",
						"@base-ui/react/toast",
						"axios",
						"react-dom/client",
						"react-markdown",
						"react-scan",
						"zod",
					],
				},
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, ".storybook"),
					}),
				],
				test: {
					name: "storybook",
					environment: "jsdom",
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({}),
						instances: [
							{
								browser: "chromium",
							},
						],
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
});
