import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-onboarding",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
		"storybook-addon-tag-badges",
		"@storybook/addon-themes",
	],
	framework: "@storybook/react-vite",
	viteFinal: async (config) => {
		const { default: tailwindcss } = await import("@tailwindcss/vite");
		config.plugins = config.plugins || [];
		config.plugins.push(tailwindcss());
		return config;
	},
};
export default config;
