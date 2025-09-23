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
		backgroundColor: "hsl(20, 14%, 4%)",
		primaryColor: "hsl(48, 96%, 53%)",
	},
	{
		displayName: "Claro",
		themeClass: "light",
		scheme: "light",
		isNew: true,
		isPremium: false,
		backgroundColor: "hsl(0, 0%, 95%)",
		primaryColor: "hsl(43, 95.8%, 45%)",
	},
];
