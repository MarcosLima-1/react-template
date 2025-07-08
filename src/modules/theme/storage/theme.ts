import Cookies from "js-cookie";
import type { ThemesClass } from "../constants/themes.ts";

const THEME_KEY = "theme";

export function saveThemeInStorage(theme: ThemesClass) {
	Cookies.set(THEME_KEY, theme);
}

export function getStorageTheme(): ThemesClass | undefined {
	const theme = Cookies.get(THEME_KEY) as ThemesClass | undefined;
	return theme;
}

export function deleteStorageTheme() {
	Cookies.remove(THEME_KEY);
}
