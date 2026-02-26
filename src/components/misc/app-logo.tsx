import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
import { Avatar } from "@/components/ui/avatar";

interface AppLogoProps extends ComponentProps<"div"> {
	hideName?: boolean;
	titleClassName?: string;
}

export function AppLogo({ hideName, className, titleClassName, ...props }: AppLogoProps) {
	return (
		<div className={cn("flex flex-1 items-center gap-2", className)} {...props}>
			<Avatar.Root>
				<Avatar.Image src="/react.svg" alt="Mima eu" />
				<Avatar.Fallback>Logo</Avatar.Fallback>
			</Avatar.Root>
			{!hideName && (
				<h2 className={cn("font-bold text-lg", titleClassName)}>
					React <span className="text-primary">template</span>
				</h2>
			)}
		</div>
	);
}
