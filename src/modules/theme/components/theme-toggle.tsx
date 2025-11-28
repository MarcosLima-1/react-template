import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { useThemeContext } from "@/modules/theme/context/theme-provider";

export function ThemeToggle() {
	const { changeTheme, currentTheme } = useThemeContext();

	function toggleTheme() {
		if (currentTheme === "dark") {
			changeTheme("light");
		} else if (currentTheme === "light") {
			changeTheme("dark");
		}
	}

	return (
		<Button variant="outline" onClick={toggleTheme}>
			{currentTheme === "dark" ? <MoonIcon /> : <SunIcon />}
		</Button>
	);
}
