import { Loader2Icon } from "lucide-react";
import { cn } from "tailwind-variants";

interface SimpleLoaderProps {
	className?: string;
}

export function SimpleLoader({ className }: SimpleLoaderProps) {
	return <Loader2Icon className={cn("animate-spin text-primary", className)} />;
}
