import type { ThemeKeys } from "@/modules/theme/constants/themes";

const THEME_KEY = "theme";

export function saveThemeInStorage(theme: ThemeKeys) {
	localStorage.setItem(THEME_KEY, theme);
}

export function getStorageTheme(): ThemeKeys {
	const storedTheme = localStorage.getItem(THEME_KEY) as ThemeKeys | undefined;
	if (storedTheme) {
		return storedTheme;
	}

	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}

	return "light";
}

export function deleteStorageTheme() {
	localStorage.removeItem(THEME_KEY);
}
