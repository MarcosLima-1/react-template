import { CheckIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { SimpleLoader } from "@/components/misc/simple-loader.tsx";
import { cn } from "@/utils/cn.ts";
import type { ThemeType } from "../constants/themes.ts";
import { useThemeContext } from "../context/theme-provider.tsx";

interface ThemeCardProps {
	theme: ThemeType;
}
export function ThemeCard({ theme }: ThemeCardProps) {
	const { changeTheme, currentTheme, isThemeLoading } = useThemeContext();
	const { themeClass, displayName, primaryColor, backgroundColor } = theme;

	const isCurrentTheme = themeClass === currentTheme;
	const isCurremtThemeLoading = isThemeLoading && themeClass === currentTheme;

	return (
		<button
			type="button"
			onClick={() => changeTheme(themeClass)}
			className={cn(
				"group/theme-card hover:bg-accent relative flex cursor-pointer flex-col items-center gap-2 rounded-md border border-transparent p-2",
				{
					"border-amber-500": isCurrentTheme,
				},
			)}
		>
			<div className="flex aspect-square size-14 overflow-hidden rounded-md border-2">
				<div
					style={
						{
							"--background": backgroundColor,
							"--primary": primaryColor,
						} as CSSProperties
					}
					className="from-primary to-background size-full bg-gradient-to-br from-50% to-50%"
				/>
			</div>
			<p className="bg-background motion-preset-fade absolute -top-1 hidden -translate-y-full rounded-md border p-2 text-sm font-bold text-nowrap group-hover/theme-card:flex">
				{displayName}
			</p>
			{isCurrentTheme && (
				<p className="absolute top-0 right-0 flex size-4 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-500 p-1">
					<CheckIcon className="text-black" />
				</p>
			)}
			{isCurremtThemeLoading && (
				<div className="absolute top-0 left-0 flex size-full items-center justify-center bg-black/30">
					<SimpleLoader />
				</div>
			)}
		</button>
	);
}
