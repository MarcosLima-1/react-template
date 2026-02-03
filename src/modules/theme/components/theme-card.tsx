import { CheckIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "tailwind-variants";
import { SimpleLoader } from "@/components/misc/simple-loader";
import type { ThemeType } from "../constants/themes.ts";
import { useThemeContext } from "../context/theme-provider";

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
			className={cn(
				"group/theme-card relative flex cursor-pointer flex-col items-center gap-2 rounded-md border border-transparent p-2 hover:bg-accent",
				{
					"border-amber-500": isCurrentTheme,
				},
			)}
			onClick={() => changeTheme(themeClass)}
			type="button"
		>
			<div className="flex aspect-square size-14 overflow-hidden rounded-md border-2">
				<div
					className="size-full bg-linear-to-br from-50% from-primary to-50% to-background"
					style={
						{
							"--background": backgroundColor,
							"--primary": primaryColor,
						} as CSSProperties
					}
				/>
			</div>
			<p className="motion-preset-fade absolute -top-1 hidden -translate-y-full text-nowrap rounded-md border bg-background p-2 font-bold text-sm group-hover/theme-card:flex">
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
