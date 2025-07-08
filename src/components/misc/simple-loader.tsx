import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface SimpleLoaderProps {
	className?: string;
}

export function SimpleLoader({ className }: SimpleLoaderProps) {
	return <Loader2 className={cn("text-primary animate-spin", className)} />;
}
