import type { LucideIcon } from "lucide-react";
import { Image } from "@/components/misc/image";
import { cn } from "@/utils/cn";

interface AvatarProps extends React.ComponentProps<"div"> {
	fallBackIcon: LucideIcon;
	src?: string | null;
	alt: string;
}

export function Avatar({ fallBackIcon: FallBackIcon, src, alt, className, ...props }: AvatarProps) {
	return (
		<div className={cn("flex aspect-square size-12 items-center justify-center overflow-hidden rounded-full border", className)} {...props}>
			{src && <Image src={src} alt={alt} height={100} width={100} className="size-full object-cover" />}
			{!src && <FallBackIcon />}
		</div>
	);
}
