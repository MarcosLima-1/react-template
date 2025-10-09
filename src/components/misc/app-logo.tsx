import { TicketIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/utils/cn";

interface AppLogoProps extends ComponentProps<"div"> {
	hideName?: boolean;
	titleClassName?: string;
}

export function AppLogo({ hideName, className, titleClassName, ...props }: AppLogoProps) {
	return (
		<div className={cn("flex flex-1 items-center gap-2", className)} {...props}>
			<Avatar alt="Mima eu" fallBackIcon={TicketIcon} src="/react.svg" />
			{!hideName && (
				<h2 className={cn("font-bold text-lg", titleClassName)}>
					React <span className="text-primary">template</span>
				</h2>
			)}
		</div>
	);
}
