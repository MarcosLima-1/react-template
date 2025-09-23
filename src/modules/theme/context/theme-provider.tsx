import { createContext, type ReactNode, use, useCallback, useEffect, useState } from "react";
import { type ThemeKeys, themeKeys, themeModuleLoaders, themes } from "@/modules/theme/constants/themes.ts";
import { getStorageTheme, saveThemeInStorage } from "../storage/theme.ts";

type ThemeProviderContext = {
	currentTheme: ThemeKeys;
	changeTheme: (newTheme: ThemeKeys) => void;
	isThemeLoading?: boolean;
};

export const ThemeProviderContext = createContext<ThemeProviderContext | undefined>(undefined);

type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: ThemeKeys;
};

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
	const [currentTheme, setCurrentTheme] = useState<ThemeKeys>(() => {
		return getStorageTheme() || defaultTheme;
	});
	const [isThemeLoading, setIsThemeLoading] = useState(false);
	const theme = themes.find((t) => t.themeClass === currentTheme);

	const applyTheme = useCallback(async () => {
		if (!theme) {
			saveThemeInStorage(defaultTheme);
			setCurrentTheme(defaultTheme);
			return;
		}

		setIsThemeLoading(true);

		const importer = themeModuleLoaders[currentTheme];
		const root = window.document.documentElement;

		if (importer) {
			await importer();
			saveThemeInStorage(theme.themeClass);
		}

		// Limpa todas as classes de tema antes de aplicar as novas
		root.classList.remove(...themeKeys, "dark", "light");

		root.classList.add(theme.themeClass, theme.scheme);
		setIsThemeLoading(false);
	}, [currentTheme, theme, defaultTheme]);

	useEffect(() => {
		applyTheme();
	}, [applyTheme]);

	const changeTheme = useCallback(
		(newTheme: ThemeKeys) => {
			if (newTheme === currentTheme || isThemeLoading) return;
			setCurrentTheme(newTheme);
		},
		[currentTheme, isThemeLoading],
	);

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
