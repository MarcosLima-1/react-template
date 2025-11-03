import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface SimpleLoaderProps {
	className?: string;
}

export function SimpleLoader({ className }: SimpleLoaderProps) {
	return <Loader2 className={cn("animate-spin text-primary", className)} />;
}
