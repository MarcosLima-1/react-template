import type { ThemesClass } from "../constants/themes.ts";

const THEME_KEY = "theme";

export function saveThemeInStorage(theme: ThemesClass) {
	localStorage.setItem(THEME_KEY, theme);
}

export function getStorageTheme(): ThemesClass | undefined {
	const theme = localStorage.getItem(THEME_KEY) as ThemesClass | undefined;
	return theme;
}

export function deleteStorageTheme() {
	localStorage.removeItem(THEME_KEY);
}
