import type { ThemeKeys } from "@/modules/theme/constants/themes";
import { isClientSide } from "@/utils/is-client-side";

const THEME_KEY = "theme";

export function saveThemeInStorage(theme: ThemeKeys) {
	if (!isClientSide()) return;

	localStorage.setItem(THEME_KEY, theme);
}

export function getStorageTheme(): ThemeKeys {
	if (!isClientSide()) return "dark";
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
	if (!isClientSide()) return;

	localStorage.removeItem(THEME_KEY);
}
