import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

export function RoundedIcon({ className, ...props }: ComponentProps<"div">) {
	return <div className={cn("flex w-fit items-center justify-center rounded-full bg-accent p-2", className)} {...props} />;
}
