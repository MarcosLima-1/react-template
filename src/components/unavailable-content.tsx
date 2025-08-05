import { AlertTriangle, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface UnavailableContentProps {
	title: string;
	icon?: LucideIcon;
	children?: ReactNode;
	message?: string;
	className?: string;
	variant?: "default" | "destructive";
	iconSize?: number;
}

export function UnavailableContent({
	title,
	icon: Icon = AlertTriangle,
	message,
	iconSize = 48,
	className,
	children,
	variant = "default",
}: UnavailableContentProps) {
	return (
		<div
			className={cn(
				"flex h-full flex-col items-center justify-center space-y-4 p-2 text-center text-muted-foreground",
				{ "text-destructive": variant === "destructive" },
				className,
			)}
		>
			<div className="flex flex-col items-center justify-center space-y-2 text-center">
				<div className="aspect-square size-fit rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-3 transition-all duration-300">
					<Icon
						style={{
							width: iconSize,
							height: iconSize,
						}}
						className="mb-2"
					/>
				</div>
				<h3 className="font-semibold text-foreground text-lg tracking-tight">{title}</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">{message}</p>
			</div>
			{children}
		</div>
	);
}
