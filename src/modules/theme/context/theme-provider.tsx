import { createContext, type ReactNode, use, useCallback, useEffect, useState } from "react";
import { allThemes, type ThemesClass, themeModuleLoaders } from "../constants/themes.ts";
import { getStorageTheme, saveThemeInStorage } from "../storage/theme.ts";

type ThemeProviderContext = {
	currentTheme: ThemesClass;
	changeTheme: (newTheme: ThemesClass) => void;
	isThemeLoading?: boolean;
};

export const ThemeProviderContext = createContext<ThemeProviderContext | undefined>(undefined);

type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: ThemesClass;
};

export function ThemeProvider({ children, defaultTheme = "dark" }: ThemeProviderProps) {
	const [currentTheme, setCurrentTheme] = useState<ThemesClass>(() => {
		return getStorageTheme() || defaultTheme;
	});
	const [isThemeLoading, setIsThemeLoading] = useState(false);
	const root = window.document.documentElement;

	const applyThemeClass = useCallback(() => {
		allThemes.forEach((t) => root.classList.remove(t));
		root.classList.add(currentTheme);
	}, [currentTheme, root.classList]);

	const importCssTheme = useCallback(async () => {
		setIsThemeLoading(true);

		const importer = themeModuleLoaders[currentTheme];
		if (importer) {
			await importer();
		}
		applyThemeClass();
		setIsThemeLoading(false);
	}, [currentTheme, applyThemeClass]);

	const changeTheme = useCallback(
		(newTheme: ThemesClass) => {
			if (newTheme === currentTheme || isThemeLoading) return;
			saveThemeInStorage(newTheme);
			setCurrentTheme(newTheme);
		},
		[currentTheme, isThemeLoading],
	);

	useEffect(() => {
		importCssTheme();
	}, [importCssTheme]);

	const value: ThemeProviderContext = {
		currentTheme,
		changeTheme,
		isThemeLoading,
	};

	return <ThemeProviderContext value={value}>{children}</ThemeProviderContext>;
}

export function useThemeContext() {
	const context = use(ThemeProviderContext);

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
}
