import type { ThemeKeys } from "@/modules/theme/constants/themes";
import { canUseStorage } from "@/utils/can-use-storage";

const THEME_KEY = "theme";

export function saveThemeInStorage(theme: ThemeKeys) {
	if (!canUseStorage()) return;

	localStorage.setItem(THEME_KEY, theme);
}

export function getStorageTheme(): ThemeKeys {
	if (!canUseStorage()) return "dark";
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
	if (!canUseStorage()) return;

	localStorage.removeItem(THEME_KEY);
}
