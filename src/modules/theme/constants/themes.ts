export const themeModuleLoaders = {
	dark: () => null,
	light: () => import("@/modules/theme/components/themes/light.css"),
} as const;

export type ThemeKeys = keyof typeof themeModuleLoaders;
export const themeKeys = Object.keys(themeModuleLoaders) as ThemeKeys[];

export interface ThemeType {
	displayName: string;
	themeClass: ThemeKeys;
	backgroundColor: string;
	primaryColor: string;
	scheme: "dark" | "light";
	isNew: boolean;
	isPremium: boolean;
}

export const themes: ThemeType[] = [
	{
		displayName: "Default",
		themeClass: "dark",
		scheme: "dark",
		isNew: true,
		isPremium: false,
		backgroundColor: "oklch(0.084 0.006 202.917)",
		primaryColor: "oklch(0.510 0.362 125.380)",
	},
	{
		displayName: "Claro",
		themeClass: "light",
		scheme: "light",
		isNew: true,
		isPremium: false,
		backgroundColor: "oklch(0.553 0.054 243.018)",
		primaryColor: "oklch(0.449 0.321 123.334)",
	},
];
